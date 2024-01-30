import { internalErrorReturn } from '../utils/utils.spec';
import { apiTester } from '../utils/api-tester.spec';
import { contactSchema } from '../../src/api/contact/models/contact';

const fakeContacts = [
  { name: 'Contact 1', link: 'link', iconName: 'icon i whant' },
  { name: 'Contact 2', link: 'link', iconName: 'icon i whant' },
  { name: 'Contact 3', link: 'link', iconName: 'icon i whant' },
];

export const contactTests = () =>
  apiTester({
    usedApi: 'api::contact.contact',
    fakeData: fakeContacts,
    apiRoutesToTest: [
      {
        method: 'get',
        route: 'contacts',
        dataAwaited: {
          status: 200,
          body: fakeContacts,
        },
        noDataReturn: {
          body: internalErrorReturn,
          status: 500,
        },
        routeShema: {
          ...contactSchema,
        },
      },
    ],
  });
