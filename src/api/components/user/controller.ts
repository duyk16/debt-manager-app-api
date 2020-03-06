import { Controller } from "../../../type/general";
import { UserModel } from "./model";

export const getAllUsers: Controller = async (req, res) => {
    const users = await UserModel.find({})
    res.status(200).json({
        status: 'ok',
        data: users
    })
}