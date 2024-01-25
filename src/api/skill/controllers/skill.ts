/**
 * skill controller
 */

import { factories } from '@strapi/strapi'
import { Context } from 'koa';
import { skillsSchema } from '../models/skill';

const { dbReturn, apiReturn } = skillsSchema; 


export default factories.createCoreController('api::skill.skill',
({ strapi }) => ({
    find: async(ctx: Context) => {
        const { response } = ctx;
        ctx.query = { ...ctx.query, local: 'en' };

        try {
            const skills = dbReturn.parse(
                 await strapi.db?.query('api::skill.skill').findMany({
                    populate: {
                        name: true,
                        techs: true,
                    }
                })
            );

            response.status = 200;
            response.body = apiReturn.parse(skills);

            return response;

        } catch (error) {
            response.status = 500
            response.body = 'Internal Server Error';

            return response;
        }

    },  
}
));
