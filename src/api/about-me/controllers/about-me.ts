/**
 * about-me controller
 */

// eslint-disable-next-line
import { Context } from 'koa';
import { factories } from '@strapi/strapi';
import { aboutMeSchema } from '../models/about-me';
import { responseTools } from '../../../lib/response-tools';

const { dbReturn, apiReturn } = aboutMeSchema;

export default factories.createCoreController(
  'api::about-me.about-me',
  ({ strapi }) => ({
    find: async (ctx: Context) => {
      const { response } = ctx;
      ctx.query = { ...ctx.query, local: 'en' };

      try {
        const aboutMe = dbReturn.parse(
          await strapi?.db?.query('api::about-me.about-me').findMany(),
        );

        return responseTools.ok(response, apiReturn.parse(aboutMe[0]));
      } catch (error) {
        return responseTools.internalError(response);
      }
    },
  }),
);
