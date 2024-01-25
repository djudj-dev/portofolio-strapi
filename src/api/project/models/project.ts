import { z } from 'zod';

const dbReturn = z
  .array(
    z.object({
      name: z.string(),
      description: z.string(),
      repo: z.string(),
      techs: z.array(
        z.object({
          name: z.string(),
        }),
      ),
    }),
  )
  .min(1);

const apiReturn = z
  .array(
    z.object({
      name: z.string(),
      description: z.string(),
      repo: z.string(),
      techs: z.array(
        z.object({
          name: z.string(),
        }),
      ),
    }),
  )
  .min(1);

export const projectsSchema = {
  apiReturn,
  dbReturn,
};
