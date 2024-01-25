/**
 * presentation controller
 */

import { factories } from '@strapi/strapi'
import { Context } from 'koa';
import { presentationSchema } from '../models/presentation';

const { dbReturn, apiReturn } = presentationSchema; 

export default factories.createCoreController('api::presentation.presentation',
({ strapi }) => ({
    find: async(ctx: Context) => {
        const { response } = ctx;
        ctx.query = { ...ctx.query, local: 'en' };

        try {
            const presentation = dbReturn.parse( 
                await strapi.db?.query('api::presentation.presentation').findMany()
            )

            response.status = 200;
            response.body = apiReturn.parse(presentation[0]);

            return response;

        } catch (error) {
            response.status = 500
            response.body = 'Internal Server Error';

            return response;
        }

    },  
}
));
