/**
 * project router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::project.project', {
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
});
