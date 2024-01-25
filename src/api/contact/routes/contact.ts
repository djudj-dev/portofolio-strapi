/**
 * contact router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::contact.contact', {
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
