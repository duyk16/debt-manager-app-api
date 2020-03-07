import { validationResult } from 'express-validator'

import { Controller } from "../../type/general"

export const errorValidator: Controller = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ code: 4000, message: errors.array() })
    }
    next()
}