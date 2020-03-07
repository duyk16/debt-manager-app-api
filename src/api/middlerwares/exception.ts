import { Response, NextFunction, Request } from "express"

import logger from "../../services/logger"
import { ResError } from "../../type/general"

export const errorHandle = (err: Error | ResError, req: Request, res: Response, next: NextFunction) => {
    logger.server(`${req.path} ${err.message}`)

    if (err instanceof ResError) {
        res.status(err.status).json({
            status: 'error',
            code: err.code,
            message: err.message,
        })
        return
    }


    let message = process.env.NODE_ENV === "development" ? err.message : "Something failed."
    res.status(500).json({
        status: 'error',
        code: 5000,
        message: message,
    })
    return
}


export const notfoundHandle = (req: Request, res: Response) => {
    res.status(404).json({
        status: 'error',
        message: 'Not found',
    })
}