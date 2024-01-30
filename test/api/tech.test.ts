import { apiTester } from '../utils/api-tester.spec';

const fakeTechs = [
  { name: 'Tech 1' },
  { name: 'Tech 2' },
  { name: 'Tech 3' },
  { name: 'Tech 4' },
  { name: 'Tech 5' },
  { name: 'Tech 6' },
];

export const techTests = () =>
  apiTester({
    usedApi: 'api::tech.tech',
    fakeData: fakeTechs,
    apiRoutesToTest: false,
  });
