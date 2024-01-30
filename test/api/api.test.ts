import { beforeAll, expect, afterAll, test, describe } from 'vitest';
import { setupStrapi, cleanupStrapi } from '../utils/strapi';
import { aboutMeTests } from './aboutMe.test';
import { contactTests } from './contact.test';
import { presentationTests } from './presentation.test';
import { projectsTests } from './project.test';
import { skillsTests } from './skill.test';
import { techTests } from './tech.test';

const collectionsTests = [
  {
    collectionName: 'AboutMe',
    tests: aboutMeTests,
  },
  {
    collectionName: 'Contact',
    tests: contactTests,
  },
  {
    collectionName: 'Presentation',
    tests: presentationTests,
  },
  {
    collectionName: 'Project',
    tests: projectsTests,
  },
  {
    collectionName: 'Skill',
    tests: skillsTests,
  },
  {
    collectionName: 'Tech',
    tests: techTests,
  },
];

describe('API Test', () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await cleanupStrapi();
  });

  test('Strapi is defined', async () => {
    expect(strapi).toBeDefined();
  });

  collectionsTests.map(({ collectionName, tests }) =>
    describe(`Collection: ${collectionName} testing`, async () => {
      tests().map((collectionTest) => collectionTest);
    }),
  );
});
