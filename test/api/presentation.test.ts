import { presentationSchema } from '../../src/api/presentation/models/presentation';
import { apiTester } from '../utils/api-tester.spec';
import { internalErrorReturn } from '../utils/utils.spec';

const fakePresentation = [
  {
    name: 'My name',
    description: 'My description',
  },
];

export const presentationTests = () =>
  apiTester({
    usedApi: 'api::presentation.presentation',
    fakeData: fakePresentation,
    isSingleType: true,
    apiRoutesToTest: [
      {
        method: 'get',
        route: 'presentation',
        dataAwaited: {
          status: 200,
          body: fakePresentation[0],
        },
        noDataReturn: {
          status: 500,
          body: internalErrorReturn,
        },
        routeShema: {
          ...presentationSchema,
        },
      },
    ],
  });
