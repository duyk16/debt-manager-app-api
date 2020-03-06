import { Request, Response, NextFunction } from "express";

export type Controller = (req: Request, res: Response, next: NextFunction) => void

export class ResError {
    public status: number
    public message: string

    constructor(status: number, message: string) {
        this.status = status
        this.message= message
    }
}