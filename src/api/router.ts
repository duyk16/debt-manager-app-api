import { Router } from 'express'

import userRouter from './components/user/router'

const rootRouter = Router()

rootRouter.use('/users', userRouter)

export default rootRouter