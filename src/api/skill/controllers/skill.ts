/**
 * skill controller
 */

// eslint-disable-next-line
import { Context } from 'koa';
import { factories } from '@strapi/strapi';
import { skillsSchema } from '../models/skill';
import { responseTools } from '../../../lib/response-tools';

const { dbReturn, apiReturn } = skillsSchema;

export default factories.createCoreController(
  'api::skill.skill',
  ({ strapi }) => ({
    find: async (ctx: Context) => {
      const { response } = ctx;
      ctx.query = { ...ctx.query, local: 'en' };

      try {
        const skills = dbReturn.parse(
          await strapi.db?.query('api::skill.skill').findMany({
            where: {
              publishedAt: { $not: null },
            },
            populate: {
              name: true,
              techs: true,
            },
          }),
        );

        return responseTools.ok(response, apiReturn.parse(skills));
      } catch (error) {
        return responseTools.internalError(response);
      }
    },
  }),
);
