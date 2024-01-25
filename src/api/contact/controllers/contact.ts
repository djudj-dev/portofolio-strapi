/**
 * contact controller
 */
import { Context } from 'koa';
import { factories } from '@strapi/strapi'
import { contactSchema } from '../models/contact';

const { dbReturn, apiReturn } = contactSchema; 

export default factories.createCoreController('api::contact.contact',
    ({ strapi }) => ({
        find: async(ctx: Context) => {
            const { response } = ctx;
            ctx.query = { ...ctx.query, local: 'en' };

            try {
                const contacts = dbReturn.parse( 
                    await strapi.db?.query('api::contact.contact').findMany()
                )
                
                response.status = 200;
                response.body = apiReturn.parse(contacts);

                return response;

            } catch (error) {
                response.status = 500
                response.body = 'Internal Server Error';

                return response;
            }

        },  
    }
));