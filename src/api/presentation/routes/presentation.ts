/**
 * presentation router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::presentation.presentation', {
  prefix: '',
  only: ['find'],
  except: [],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
});
