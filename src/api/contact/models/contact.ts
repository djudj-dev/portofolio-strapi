import { z } from "zod";

const dbReturn = z.array(z.object(
    {
        name: z.string(),
        iconName: z.string().optional(),
        link: z.string()
    }
))

const apiReturn = z.array(z.object(
    {
        name: z.string(),
        iconName: z.string().optional(),
        link: z.string()
    }
))

export const contactSchema = {
    apiReturn,
    dbReturn,
}