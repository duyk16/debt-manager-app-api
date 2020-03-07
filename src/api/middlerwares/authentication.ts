import { Controller, ResError } from "../../type/general";
import { validateToken } from "../../services/auth";
import { Request } from "express";

let ignoreAuthRouters = [
    { url: '/v1/users', method: 'POST' },
    { url: '/v1/users/auth', method: 'POST' }
]

export const authenticate: Controller = async (req, res, next) => {
    // Check ingore router for check token
    if (isIgnoreRouter(req)) return next()

    let token = req.headers["authorization"]
    if (!token) {
        next(new ResError(401, 40100, "Unauthentication"))
        return
    }

    let payload = validateToken(token)

    if (!payload) {
        next(new ResError(401, 40101, "Unauthentication"))
        return
    }

    req.user = payload
    next()
}

export const isIgnoreRouter = async (req: Request) => {
    for (let route of ignoreAuthRouters) {
        if (route.url === req.url && route.method === req.method) {
            return true
        }
    }
    return false
}