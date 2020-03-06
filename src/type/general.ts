import { Request, Response } from "express";

export type Controller = (req: Request, res: Response) => void

export class ResError {
    public status: number
    public message: string

    constructor(status: number, message: string) {
        this.status = status
        this.message= message
    }
}