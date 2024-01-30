import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./test/api/api.test.ts', './test/lib/*.test.ts'],
  },
  build: {
    sourcemap: true,
  },
});
