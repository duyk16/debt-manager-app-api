import { Router } from 'express'
import { param } from 'express-validator'

import { getAllUsers, getUserById, createUser } from './controller'
import { errorValidator } from '../../middlerwares/validator'

const userRouter = Router()

userRouter.get('/', [
    getAllUsers
])

userRouter.get('/:id', [
    param("id").isLength({ min: 24 }),
    errorValidator,
    getUserById
])

userRouter.post('/', [
    createUser
])

export default userRouter