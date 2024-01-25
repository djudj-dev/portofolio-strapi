import { z } from "zod";

const dbReturn = z.array(z.object(
    {
        text: z.string()
    }
))

const apiReturn = z.object({
    text: z.string()
})

export const aboutMeSchema = {
    apiReturn,
    dbReturn,
}