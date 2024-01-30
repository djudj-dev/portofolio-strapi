import { describe, expect, test } from 'vitest';
import { responseTools } from '../../src/lib/response-tools';
import { internalErrorReturn } from '../utils/utils.spec';

describe('Response-tools testing', () => {
  test('Should return response 500, with expected Body', () => {
    const response = {};
    const internalErrorResponse = responseTools.internalError(response as any);

    expect(internalErrorResponse.body).toEqual(internalErrorReturn);
    expect(internalErrorResponse.status).toBe(500);
  });

  test('Should return response 200, with expected body', () => {
    const response = {};
    const data = { test: 'data test' };
    const okResponse = responseTools.ok(response as any, data);

    expect(okResponse.body).toEqual(data);
    expect(okResponse.status).toBe(200);
  });
});
