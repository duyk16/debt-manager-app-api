import { validationResult } from 'express-validator'

import { Controller } from "../../type/general"

export const errorValidator: Controller = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    next()
}