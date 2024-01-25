/**
 * presentation controller
 */

// eslint-disable-next-line
import { Context } from 'koa';
import { factories } from '@strapi/strapi';
import { presentationSchema } from '../models/presentation';
import { responseTools } from '../../../lib/response-tools';

const { dbReturn, apiReturn } = presentationSchema;

export default factories.createCoreController(
  'api::presentation.presentation',
  ({ strapi }) => ({
    find: async (ctx: Context) => {
      const { response } = ctx;
      ctx.query = { ...ctx.query, local: 'en' };

      try {
        const presentation = dbReturn.parse(
          await strapi.db?.query('api::presentation.presentation').findMany(),
        );

        return responseTools.ok(response, apiReturn.parse(presentation[0]));
      } catch (error) {
        return responseTools.internalError(response);
      }
    },
  }),
);
