import request from 'supertest';

/**
 * Usefull data for testing
 */

export const internalErrorReturn = {
  msg: 'Internal Server Error',
};

export type Route = keyof typeof ROUTES;

const ROUTES = {
  contacts: 'contacts',
  skills: 'skills',
  presentation: 'presentation',
  aboutMe: 'about-me',
  projetcs: 'projects',
};

/**
 * Usefull functions for testing
 */
export type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export const fetchApi = (method: RequestMethod, route: keyof typeof ROUTES) =>
  request(strapi.server.httpServer)[method](`/api/${ROUTES[route]}`);
