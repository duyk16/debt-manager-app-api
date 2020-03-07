import { MongoError } from 'mongodb'

import { UserModel } from "./model";

import { Controller, ResError } from "../../../type/general";
import { validatePassword, generateToken } from '../../../services/auth';

export const getAllUsers: Controller = async (req, res, next) => {
    try {
        const users = await UserModel.find({})
        res.status(200).json({
            status: 'ok',
            data: users
        })
    } catch (error) {
        Log.controller(error)
        next(error)
    }
}

export const getUserById: Controller = async (req, res, next) => {
    try {
        const { id } = req.query
        const user = await UserModel.findById(id)

        if (!user) {
            return res.status(400).json({
                status: 'error',
                error: 'Not found User ID'
            })
        }

        res.status(200).json({
            status: 'ok',
            data: user
        })
    } catch (error) {
        Log.controller(error)
        next(error)
    }
}

export const createUser: Controller = async (req, res, next) => {
    try {
        const { email, password, userName } = req.body
        const user = new UserModel({ email, password, userName })

        await user.save()
        res.status(201).json({
            status: 'ok',
            data: { _id: user._id }
        })
    } catch (error) {
        if (error instanceof MongoError) {
            if (error.code === 5000) {
                error = new ResError(400, 4001, "Email was register before")
                next(error)
                return
            }
        }
        Log.controller(error)
        next(error)
    }
}

export const updateUser: Controller = async (req, res, next) => {
    try {
        const { id } = req.params
        const { userName, password } = req.body

        let updateQuery: any = { $set: {} }

        if (userName) updateQuery.$set["userName"] = userName
        if (password) updateQuery.$set["password"] = password

        let user = await UserModel.findByIdAndUpdate(
            id,
            updateQuery,
            { new: true },
        )

        if (!user) throw new ResError(400, 4002, "Not found user id")

        res.status(200).json({
            status: 'ok',
            data: user,
        })
    } catch (error) {
        Log.controller(error)
        next(error)
    }
}

export const createLogin: Controller = async (req, res, next) => {
    try {
        const { email, password } = req.body
        let user = await UserModel.findOne({ email })
        if (!user) throw new ResError(400, 4003, "Email is not exist")

        let match = validatePassword(password, user.password)
        if (!match) throw new ResError(400, 4004, "Password is not match")

        let token = generateToken({ _id: user._id, email: user.email })
        res.status(200).json({
            status: 'ok',
            data: token,
        })

    } catch (error) {
        Log.controller(error)
        next(error)
    }
}