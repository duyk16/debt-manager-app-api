import { Router } from 'express'
import { param, body } from 'express-validator'

import { getAllUsers, getUserById, createUser, updateUser, createLogin } from './controller'
import { errorValidator } from '../../middlerwares/validator'

const userRouter = Router()

userRouter.get('/', [
    getAllUsers
])

userRouter.get('/:id', [
    param('id').isLength({ min: 24 }),
    errorValidator,
    getUserById
])

userRouter.post('/', [
    body(['userName', 'password']).isString(),
    body('email').isEmail(),
    errorValidator,
    createUser
])

userRouter.put('/', [
    param('id').isLength({ min: 24 }),
    errorValidator,
    updateUser
])

userRouter.post('/auth', [
    body('email').isEmail(),
    body('password').isString(),
    errorValidator,
    createLogin,
])

export default userRouter