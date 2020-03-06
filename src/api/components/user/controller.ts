import { Controller } from "../../../type/general";
import { UserModel } from "./model";

export const getAllUsers: Controller = async (req, res) => {
    const users = await UserModel.find({})
    res.status(200).json({
        status: 'ok',
        data: users
    })
}

export const getUserById: Controller = async (req, res) => {
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
}

export const createUser: Controller = async (req, res) => {
    const { email, password, fullName } = req.body

    const user = new UserModel({
    })
}