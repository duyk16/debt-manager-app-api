import { TransactionModel } from "./model";
import { Controller, ResError } from "../../../type/general";
import { UserModel } from "../user/model";

export const getAllTransactions: Controller = async (req, res, next) => {
    try {
        let { page, limit } = req.query
        let count = await TransactionModel.find({}).count()
        let endPage = count / limit | 0

        if (page > endPage) throw new ResError(400, 40010, "Query page is not valid")

        let transactions = await TransactionModel.find({})
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .select('-__v')
            .lean()

        res.status(200).json({
            status: 'ok',
            data: transactions,
            page,
            endPage,
        })
    } catch (error) {
        Log.controller(error)
        next(error)
    }
}

export const createTransaction: Controller = async (req, res, next) => {
    try {
        let { debtor, value } = req.body
        value = parseInt(value)
        if (!value || value <= 0) throw new ResError(400, 40011, "Value is not valid")

        let debtUser = await UserModel.findById(debtor)
        if (!debtUser) throw new ResError(400, 40012, "Debtor is not exist")

        let transaction = new TransactionModel({
            debtor,
            creditor: req.user._id,
            value,
        })

        await transaction.save()

        res.status(201).json({
            status: 'ok',
            data: { _id: transaction._id }
        })
    } catch (error) {
        Log.controller(error)
        next(error)
    }
}