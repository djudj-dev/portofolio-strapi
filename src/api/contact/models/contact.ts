import { z } from 'zod';

const dbReturn = z
  .array(
    z.object({
      name: z.string(),
      iconName: z.string().optional(),
      link: z.string(),
    }),
  )
  .min(1);

const apiReturn = z
  .array(
    z.object({
      name: z.string(),
      iconName: z.string().optional(),
      link: z.string(),
    }),
  )
  .min(1);

export const contactSchema = {
  apiReturn,
  dbReturn,
};
