import { z } from "zod";

const dbReturn = z.array(z.object(
    {
        name: z.string(),
        description: z.string(),
    }
))

const apiReturn = z.object({
    name: z.string(),
    description: z.string(),
})

export const presentationSchema = {
    apiReturn,
    dbReturn,
}