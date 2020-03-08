import { MongoError } from 'mongodb'

import { UserModel, User } from "./model";

import { Controller, ResError } from "../../../type/general";
import { validatePassword, generateToken } from '../../../helper/auth';

export const getAllUsers: Controller = async (req, res, next) => {
    try {
        const users = await UserModel.find({}).select('-__v -password').lean()
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
        const user = await UserModel.findById(id).select('-__v -password').lean()

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
                error = new ResError(400, 40001, "Email was register before")
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
        ).select('-__v -password').lean()

        if (!user) throw new ResError(400, 40002, "Not found user id")

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
        let user = await UserModel.findOne({ email }).select('-__v -password').lean()
        if (!user) throw new ResError(400, 40003, "Email is not exist")

        let match = validatePassword(password, user.password)
        if (!match) throw new ResError(400, 40004, "Password is not match")

        let token = generateToken({ _id: user._id, email: user.email, userName: user.userName })
        res.status(200).json({
            status: 'ok',
            data: {
                ...user,
                token
            },
        })

    } catch (error) {
        Log.controller(error)
        next(error)
    }
}