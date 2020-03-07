import { Router } from 'express'
import { body } from 'express-validator'

import { getAllTransactions, createTransaction } from './controller'
import { errorValidator } from '../../middlerwares/validator'
import { paginate } from '../../middlerwares/pagination'

const transactionRouter = Router()

transactionRouter.get('/', [
    paginate,
    getAllTransactions,
])

transactionRouter.post('/', [
    body('debtor').isLength({ min: 24 }),
    body('value').isNumeric(),
    errorValidator,
    createTransaction,
])

export default transactionRouter