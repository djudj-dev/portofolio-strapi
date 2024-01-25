/**
 * skill router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::skill.skill', {
    prefix: '',
    only: ['find'],
    except: [],
    config: {
        find: {
            auth: false,
            policies: [],
            middlewares: [],
        },
    }
} );
