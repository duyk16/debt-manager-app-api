import { Router } from 'express'

import userRouter from './components/user/router'

const rootRouter = Router()

rootRouter.use('/user', userRouter)

export default rootRouter