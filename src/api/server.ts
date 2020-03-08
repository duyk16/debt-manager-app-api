import Express from 'express'
import Morgan from 'morgan'
import BodyParser from 'body-parser'

import rootRouter from './router'
import { authenticate } from './middlerwares/authentication'
import { errorHandle, notfoundHandle } from './middlerwares/exception'

const app = Express()

if (process.env.NODE_ENV === 'development') {
    app.use(Morgan('dev'))
}

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: false }))
app.use(authenticate)

app.use('/v1', rootRouter)

// Exception handle
app.use(errorHandle)
app.use(notfoundHandle)

export default app