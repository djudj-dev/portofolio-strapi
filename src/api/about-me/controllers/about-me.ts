/**
 * about-me controller
 */
import { Context } from 'koa';
import { factories } from '@strapi/strapi'
import { aboutMeSchema } from '../models/about-me';

const { dbReturn, apiReturn } = aboutMeSchema 

export default factories.createCoreController('api::about-me.about-me', 
    ({ strapi }) => ({
        find: async(ctx: Context) => {
            const { response } = ctx;
            ctx.query = { ...ctx.query, local: 'en' };

            try {
                const aboutMe = dbReturn.parse(
                    await strapi?.db?.query('api::about-me.about-me').findMany()
                );
        
                response.status = 200
                response.body = apiReturn.parse(aboutMe[0]);

                return response;

            } catch (error) {
                response.status = 500
                response.body = 'Internal Server Error';

                return response;
            }
    
        },  
    }
));
