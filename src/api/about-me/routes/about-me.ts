/**
 * about-me router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::about-me.about-me', {
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
