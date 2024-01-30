import { internalErrorReturn } from '../utils/utils.spec';
import { apiTester } from '../utils/api-tester.spec';
import { skillsSchema } from '../../src/api/skill/models/skill';

const fakeSkillData = [
  {
    name: 'Skill 1',
    techs: 'automatically created with config',
  },
  {
    name: 'Skill 2',
    techs: 'automatically created with config',
  },
  {
    name: 'Skill 3',
    techs: 'automatically created with config',
  },
];

const fakeSkillReturn = [
  {
    name: 'Skill 1',
    techs: [{ name: 'Tech 1' }, { name: 'Tech 2' }],
  },
  {
    name: 'Skill 2',
    techs: [{ name: 'Tech 1' }, { name: 'Tech 2' }],
  },
  {
    name: 'Skill 3',
    techs: [{ name: 'Tech 1' }, { name: 'Tech 2' }],
  },
];

const fakeTechs = [{ name: 'Tech 1' }, { name: 'Tech 2' }];

export const skillsTests = () =>
  apiTester({
    usedApi: 'api::skill.skill',
    fakeData: fakeSkillData,
    otherInsertDataNeeded: [
      {
        otherDataUesedApi: 'api::tech.tech',
        data: fakeTechs,
        attributeName: 'techs',
      },
    ],
    apiRoutesToTest: [
      {
        method: 'get',
        route: 'skills',
        dataAwaited: {
          status: 200,
          body: fakeSkillReturn,
        },
        noDataReturn: {
          body: internalErrorReturn,
          status: 500,
        },
        routeShema: {
          ...skillsSchema,
          dbFindManyQuery: {
            populate: {
              name: true,
              techs: true,
            },
          },
        },
      },
    ],
  });
