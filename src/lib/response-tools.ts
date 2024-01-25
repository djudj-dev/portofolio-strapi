import { Response } from "koa";

const ok = (response: Response, body: unknown) => {
    response.status = 200
    response.body = body

    return response;
}

const internalError = (response: Response) => {
    response.status = 500
    response.body = { msg : 'Internal Server Error' }

    return response;
}

export const responseTools = {
    ok,
    internalError
}