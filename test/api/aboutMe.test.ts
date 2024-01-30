import { aboutMeSchema } from '../../src/api/about-me/models/about-me';
import { apiTester } from '../utils/api-tester.spec';
import { internalErrorReturn } from '../utils/utils.spec';

const fakeAboutMe = [
  {
    text: 'About me test text',
  },
];

export const aboutMeTests = () =>
  apiTester({
    usedApi: 'api::about-me.about-me',
    fakeData: fakeAboutMe,
    isSingleType: true,
    apiRoutesToTest: [
      {
        method: 'get',
        route: 'aboutMe',
        dataAwaited: {
          status: 200,
          body: fakeAboutMe[0],
        },
        noDataReturn: {
          status: 500,
          body: internalErrorReturn,
        },
        routeShema: {
          ...aboutMeSchema,
        },
      },
    ],
  });
