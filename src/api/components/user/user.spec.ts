import request from 'supertest'

import { UserModel, User } from './model'
import server from '../../server'

describe('User', () => {
    beforeEach(async () => {
        let user = new UserModel({ name: "Duy Nguyen" } as User)
        await user.save()
    })

    afterEach(async () => {
        await UserModel.deleteMany({})
    })

    describe('/GET ', () => {
        it('it should GET all the users', async () => {
            let res = await request(server).get('/user')
            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({ status: 'ok' })
            expect(res.body.data[0]).toMatchObject({ name: "Duy Nguyen" })
        })
    })

    describe('/GET not found ', () => {
        it('it should return not found', async () => {
            let res = await request(server).get('/user/asldkasd')
            expect(res.status).toBe(404)
            expect(res.body).toMatchObject({ status: 'error' })
        })
    })
})