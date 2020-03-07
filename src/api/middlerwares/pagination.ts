import { Controller, ResError } from "../../type/general";

export const paginate: Controller = (req, res, next) => {
    req.query.page = parseInt(req.query.page) || 1
    req.query.limit = parseInt(req.query.limit) || 10

    if (req.query.page < 1 || req.query.limit < 1 || req.query.limit > 100) {
        next(new ResError(400, 4010, "Query is not valid"))
        return
    }

    next()
}