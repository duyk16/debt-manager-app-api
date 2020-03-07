import { Request, Response, NextFunction } from "express";

export type Controller = (req: Request, res: Response, next: NextFunction) => void

export class ResError {
    public status: number
    public message: string
    public code: number

    constructor(status: number, code: number, message: string) {
        this.status = status
        this.code = code
        this.message = message
    }
}