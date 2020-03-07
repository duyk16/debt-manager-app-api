import { Router } from 'express'
import { body } from 'express-validator'

import { paginate } from '../../middlerwares/pagination'
import { errorValidator } from '../../middlerwares/validator'
import { createPayment, getAllPayments } from './controller'

const paymentRouter = Router()

paymentRouter.get('/', [
    paginate,
    getAllPayments,
])

paymentRouter.post('/', [
    body('id').isLength({ min: 24 }),
    errorValidator,
    createPayment,
])

export default paymentRouter