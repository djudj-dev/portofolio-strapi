/**
 * project controller
 */

// eslint-disable-next-line
import { Context } from 'koa';
import { factories } from '@strapi/strapi';
import { projectsSchema } from '../models/project';
import { responseTools } from '../../../lib/response-tools';

const { dbReturn, apiReturn } = projectsSchema;

export default factories.createCoreController(
  'api::project.project',
  ({ strapi }) => ({
    find: async (ctx: Context) => {
      const { response } = ctx;
      ctx.query = { ...ctx.query, local: 'en' };

      try {
        const projects = dbReturn.parse(
          await strapi?.db?.query('api::project.project').findMany({
            where: {
              publishedAt: { $not: null },
            },
            populate: {
              name: true,
              description: true,
              repo: true,
              techs: true,
            },
          }),
        );

        return responseTools.ok(response, apiReturn.parse(projects));
      } catch (error) {
        return responseTools.internalError(response);
      }
    },
  }
  ),
);
