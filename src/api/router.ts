import { Router } from 'express'

import userRouter from './components/user/router'
import transactionRouter from './components/transaction/router'
import paymentRouter from './components/payment/router'

const rootRouter = Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/transactions', transactionRouter)
rootRouter.use('/payments', paymentRouter)

export default rootRouter