import Bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'

type TokenPayload = {
    _id: string,
    email: string,
}

export const validatePassword = async (password: string, hash: string): Promise<boolean> => {
    return await Bcrypt.compare(password, hash)
}

export const generateToken = (data: TokenPayload): string => {
    let token = Jwt.sign(data, process.env.JWT_KEY || '', { expiresIn: Date.now() + 365 * 24 * 60 * 60 * 1000 })
    return token
}

export const validateToken = (token: string): TokenPayload | null => {
    try {
        return Jwt.verify(token, process.env.JWT_KEY || '') as TokenPayload
    } catch (error) {
        return null
    }
}