/**
 * project controller
 */

import { factories } from '@strapi/strapi'
import { Context } from 'koa';
import { projectsSchema } from '../models/project';

const { dbReturn, apiReturn } = projectsSchema; 

export default factories.createCoreController('api::project.project',
({ strapi }) => ({
    find: async(ctx: Context) => {
        const { response } = ctx;
        ctx.query = { ...ctx.query, local: 'en' };

        try {
            const projects = dbReturn.parse(
                await strapi?.db?.query('api::project.project').findMany({
                    populate: {
                        name: true,
                        description: true,
                        repo: true,
                        techs: true,
                    }
                })
            );

            response.status = 200;
            response.body = apiReturn.parse(projects);

            return response;

        } catch (error) {
            response.status = 500
            response.body = 'Internal Server Error';

            return response;
        }

    },  
}
));
