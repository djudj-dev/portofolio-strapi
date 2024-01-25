/**
 * contact controller
 */

// eslint-disable-next-line
import { Context } from 'koa';
import { factories } from '@strapi/strapi';
import { contactSchema } from '../models/contact';
import { responseTools } from '../../../lib/response-tools';

const { dbReturn, apiReturn } = contactSchema;

export default factories.createCoreController(
  'api::contact.contact',
  ({ strapi }) => ({
    find: async (ctx: Context) => {
      const { response } = ctx;
      ctx.query = { ...ctx.query, local: 'en' };

      try {
        const contacts = dbReturn.parse(
          await strapi.db?.query('api::contact.contact').findMany(),
        );

        return responseTools.ok(response, apiReturn.parse(contacts));
      } catch (error) {
        return responseTools.internalError(response);
      }
    },
  }
  ),
);
