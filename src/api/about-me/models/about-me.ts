import { z } from 'zod';

const dbReturn = z.array(z.object(
  {
    text: z.string(),
  },
)).min(1);

const apiReturn = z.object({
  text: z.string(),
});

export const aboutMeSchema = {
  apiReturn,
  dbReturn,
};
