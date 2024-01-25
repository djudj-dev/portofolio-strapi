import { z } from "zod";

const dbReturn = z.array(z.object(
    {
        name: z.string(),
        description: z.string(),
        repo: z.string(),
        techs: z.array(z.object({
            name: z.string()
        }))

    }
))

const apiReturn = z.array(z.object(
    {
        name: z.string(),
        description: z.string(),
        repo: z.string(),
        techs: z.array(z.object({
            name: z.string()
        }))

    }
))

export const projectsSchema = {
    apiReturn,
    dbReturn,
}