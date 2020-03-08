import { Controller, ResError } from "../../../type/general";

import { PaymentModel } from "./model";
import { TransactionModel } from "../transaction/model";
import { UserModel } from "../user/model";

export const getAllPayments: Controller = async (req, res, next) => {
    try {
        let { page, limit } = req.query
        let count = await PaymentModel.find({}).count()
        let endPage = count / limit | 0

        if (page > endPage) throw new ResError(400, 40010, "Query page is not valid")

        let payments = await PaymentModel.find({})
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .select('-__v')
            .lean()

        res.status(200).json({
            status: 'ok',
            data: payments,
            page,
            endPage,
        })
    } catch (error) {
        Log.controller(error)
        next(error)
    }
}

export const createPayment: Controller = async (req, res, next) => {
    try {
        let { id } = req.body

        let transaction = await TransactionModel.findByIdAndUpdate(id, { $set: { isPaid: true } })
        if (!transaction) throw new ResError(400, 40020, "Transaction ID is not valid")

        let payment = new PaymentModel({ transaction })

        await Promise.all([
            payment.save(),
            UserModel.findByIdAndUpdate(transaction.creditor, { $inc: { totalCredit: -transaction.value}}),
            UserModel.findByIdAndUpdate(transaction.debtor, { $inc: { totalDebt: -transaction.value}})
        ])

        res.status(201).json({
            status: 'ok',
            data: { _id: payment._id }
        })
    } catch (error) {
        Log.controller(error)
        next(error)
    }
}