declare namespace Log {
    const server: Function
    const controller: Function
    const middleware: Function
    const service: Function
}

declare type TokenPayload = {
    _id: string,
    email: string,
}

declare namespace Express {
    export interface Request {
        user: TokenPayload
    }
}
