import Express from 'express'
import Morgan from 'morgan'
import BodyParser from 'body-parser'
import Mongoose from 'mongoose'

import logger from '../services/logger'
import rootRouter from './router'
import { errorHandle, notfoundHandle } from './middlerwares/exception'

const app = Express()

if (process.env.NODE_ENV === 'development') {
    app.use(Morgan('dev'))
}

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: false }))

app.use(rootRouter)

// Exception handle
app.use(errorHandle)
app.use(notfoundHandle)

Mongoose.connect(
    process.env.MONGO_URL || 'mongodb://localhost:27017/test',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return logger.server('Connect fail')
        return logger.server('Connected to MongoDB')
    }
)

export default app