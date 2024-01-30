import { internalErrorReturn } from '../utils/utils.spec';
import { apiTester } from '../utils/api-tester.spec';
import { projectsSchema } from '../../src/api/project/models/project';

const fakeProjectData = [
  {
    name: 'Project 1',
    description: 'project decription',
    repo: 'http://github.link',
    techs: 'automatically created with config',
  },
  {
    name: 'Project 2',
    description: 'project decription',
    repo: 'http://github.link',
    techs: 'automatically created with config',
  },
  {
    name: 'Project 3',
    description: 'project decription',
    repo: 'http://github.link',
    techs: 'automatically created with config',
  },
];

const fakeProjectReturn = [
  {
    name: 'Project 1',
    description: 'project decription',
    repo: 'http://github.link',
    techs: [{ name: 'tech1' }, { name: 'tech2' }],
  },
  {
    name: 'Project 2',
    description: 'project decription',
    repo: 'http://github.link',
    techs: [{ name: 'tech1' }, { name: 'tech2' }],
  },
  {
    name: 'Project 3',
    description: 'project decription',
    repo: 'http://github.link',
    techs: [{ name: 'tech1' }, { name: 'tech2' }],
  },
];

const fakeTechs = [{ name: 'tech1' }, { name: 'tech2' }];

export const projectsTests = () =>
  apiTester({
    usedApi: 'api::project.project',
    fakeData: fakeProjectData,
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
        route: 'projetcs',
        dataAwaited: {
          status: 200,
          body: fakeProjectReturn,
        },
        noDataReturn: {
          body: internalErrorReturn,
          status: 500,
        },
        routeShema: {
          ...projectsSchema,
          dbFindManyQuery: {
            populate: {
              name: true,
              description: true,
              repo: true,
              techs: true,
            },
          },
        },
      },
    ],
  });
