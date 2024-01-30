import { beforeEach, describe, expect, it } from 'vitest';
import { ZodType } from 'zod';
import { RequestMethod, Route, fetchApi } from './utils.spec';

type OtherInsertDataNeeded = {
  otherDataUesedApi: string;
  data: unknown;
  attributeName: string;
}[];

type RequestWantedReturn = {
  body?: unknown;
  status?: number;
};

type RouteSchema = {
  dbReturn: ZodType;
  apiReturn: ZodType;
  dbFindManyQuery?: unknown;
};

type ApiRouteToTest = {
  route: Route;
  method: RequestMethod;
  dataAwaited: RequestWantedReturn;
  noDataReturn: RequestWantedReturn;
  routeShema: RouteSchema;
  isDraftPublish?: undefined | boolean;
};

type ApiTesterParams<T> = {
  usedApi: string;
  fakeData: T[];
  otherInsertDataNeeded?: OtherInsertDataNeeded;
  apiRoutesToTest?: ApiRouteToTest[] | false;
  isSingleType?: boolean;
};

/**
 * Each API test must contain a series of tests verifying that :
 * - We can create and delete expected values in the database
 * - We can retrieve the expected values via the API in code 500
 * - If there are no values in the database, we receive a code 500.
 * - The Zod schemas associated with the API route work as expected.
 */

/**
 * @apiTester is a test utility function for factorize and simplify strapi collectionType API testing
 * @param {ApiTesterParams} config - is the only parameter take, an object for configure the testing
 */
export const apiTester = <T>(config: ApiTesterParams<T>) => {
  const {
    usedApi,
    fakeData,
    otherInsertDataNeeded,
    apiRoutesToTest,
    isSingleType,
  } = config;
  // les 3 generateurs d'effet de bord de la fonction sans compter l'object strapi
  const testArray = [];
  const getFakeData = () => structuredClone(fakeData);
  const DataNeededIds: { [T: string]: unknown } = {};

  const createManyEntries = async () => {
    if (otherInsertDataNeeded) {
      await Promise.all(
        getFakeData().map(async (data) => {
          const additionalData = otherInsertDataNeeded.reduce(
            (previous, { attributeName }) => ({
              ...previous,
              [attributeName]: { set: DataNeededIds[attributeName] },
            }),
            {},
          );

          await strapi.db.query(usedApi).create({
            data: {
              ...data,
              ...additionalData,
            },
          });
        }),
      );

      return;
    }

    if (isSingleType) {
      await strapi.db.query(usedApi).create({ data: getFakeData()[0] });

      return;
    }

    await strapi.db.query(usedApi).createMany({ data: getFakeData() });
  };

  const getBeforeEach = () =>
    beforeEach(async () => {
      await strapi.db.query(usedApi).deleteMany();

      if (otherInsertDataNeeded) {
        await Promise.all(
          otherInsertDataNeeded.map(
            async ({ otherDataUesedApi, data, attributeName }) => {
              await strapi.db.query(otherDataUesedApi).deleteMany();
              DataNeededIds[attributeName] = await strapi.db
                .query(otherDataUesedApi)
                .createMany({ data })
                .then(({ ids }) => ids);
            },
          ),
        );
      }
    });

  testArray.push(
    describe(`Check add and delete value to DB in ${usedApi}`, async () => {
      getBeforeEach();

      it('Should add Data to the Database', async () => {
        await createManyEntries();
        const [, length] = await strapi.db.query(usedApi).findWithCount();
        expect(length).toEqual(getFakeData().length);
      });

      it('Should delete data to db after add it', async () => {
        await createManyEntries();

        const [, length] = await strapi.db.query(usedApi).findWithCount();
        expect(length).toEqual(getFakeData().length);

        await strapi.db.query(usedApi).deleteMany();
        const [, lengthAfterDelete] = await strapi.db
          .query(usedApi)
          .findWithCount();
        expect(lengthAfterDelete).toEqual(0);
      });
    }),
  );

  if (apiRoutesToTest) {
    Promise.all(
      apiRoutesToTest.map(async (apiRouteToTest) => {
        const { dataAwaited, noDataReturn, route, routeShema } = apiRouteToTest;

        const getDataAwaited = () => structuredClone(dataAwaited);
        const getNoDataAwaited = () => structuredClone(noDataReturn);

        testArray.push(
          describe(`Check API return in ${usedApi}, route: ${route}`, async () => {
            getBeforeEach();

            it('Should return wanted value', async () => {
              await createManyEntries();
              const data = await fetchApi('get', route);

              if (getDataAwaited().body) {
                expect(data.body).toEqual(getDataAwaited().body);
              }

              if (getDataAwaited().status) {
                expect(data.status).toEqual(getDataAwaited().status);
              }
            });

            it('Should return error msg', async () => {
              const data = await fetchApi('get', route);

              if (getNoDataAwaited().body) {
                expect(data.body).toEqual(getNoDataAwaited().body);
              }

              if (getNoDataAwaited().status) {
                expect(data.status).toEqual(getNoDataAwaited().status);
              }
            });
          }),
        );

        testArray.push(
          describe(`Check RouteSchema in ${usedApi}, route: ${route}`, async () => {
            getBeforeEach();
            const { dbFindManyQuery, apiReturn, dbReturn } = routeShema;

            it('Should parse db return without error', async () => {
              await createManyEntries();
              const data = await strapi.db
                .query(usedApi)
                .findMany(dbFindManyQuery || undefined);
              const { success } = dbReturn.safeParse(data);

              expect(success).toBe(true);
            });

            it('Should parse db return with error', async () => {
              const data = [{}];
              const { success } = dbReturn.safeParse(data);

              expect(success).toBe(false);
            });

            it('Should parse api return without error', async () => {
              await createManyEntries();
              const data = await fetchApi('get', route);
              const dataParsed = apiReturn.safeParse(data.body);

              expect(dataParsed.success).toBe(true);
            });

            it('Should parse api return with error', async () => {
              const data = [{}];

              const { success } = apiReturn.safeParse(data);
              expect(success).toBe(false);
            });
          }),
        );
      }),
    );
  }

  return testArray;
};
