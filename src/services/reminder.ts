import Redis, { RedisClient } from "redis"

import Email from "./email"
import { TransactionModel } from "../api/components/transaction/model"
import { UserModel } from "../api/components/user/model"

type EmailForm = { to: string, subject: string, text: string, date: number }

export default class Reminder {
    private static jobs: { [key in string]: NodeJS.Timeout } = {} // key = transactionId
    private static redisClient: RedisClient

    public static async init() {
        try {
            Reminder.redisClient = Redis.createClient({
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379'),
                db: parseInt(process.env.REDIS_DB || '0'),
                password: process.env.REDIS_PASSWORD,
            })

            await new Promise(res => setTimeout(res, 500))
            if (!Reminder.redisClient.ping()) throw new Error("Could not ping to redis")

            Log.service('Connected to Redis')

            // Get all reminders
            let { keys, data } = await Reminder.getAllReminder()

            keys.forEach((transactionId, index) => {
                new Reminder(transactionId, data[index], false)
            })

        } catch (error) {
            Log.service('Connec to Redis fail', error)
            process.exit(1)
        }
    }

    constructor(transactionId: string, email: EmailForm, save: boolean = true, ) {
        let time = email.date - Date.now()
        if (time < 0) time = 0

        if (save) Reminder.saveReminder(transactionId, email)

        let job = setTimeout(async () => {
            try {
                let transaction = await TransactionModel.findById(transactionId)
                if (!transaction) throw new Error(`Not found transaction with Id: ${transactionId}`)
                if (transaction.isPaid) return

                await Email.sendEmail('Reminder', email.to, email.subject, email.text)
                await UserModel.findByIdAndUpdate(transaction.debtor, { $inc: { remindTime: 1 } })

                delete Reminder.jobs[transactionId]
            } catch (error) {
                Log.service('Reminder fail', error)
            }

        }, time)

        Reminder.jobs[transactionId] = job
    }

    public static cancelJob(transactionId: string) {
        let job = Reminder.jobs[transactionId]
        clearTimeout(job)
        delete Reminder.jobs[transactionId]
        Reminder.deleteRemider(transactionId)
    }


    private static saveReminder(transactionId: string, email: EmailForm) {
        return new Promise((rs, rj) => {
            Reminder.redisClient.hmset('transaction:' + transactionId, email, (err, data) => {
                if (err) return rj(err)
                rs(data)
            })
        })
    }

    private static getAllReminder() {
        return new Promise<{ keys: string[], data: EmailForm[] }>(async (rs, rj) => {
            try {
                let keys: string[] = await new Promise((rs, rj) => {
                    Reminder.redisClient.keys('transaction:*', (err, data) => {
                        if (err) return rj(err)
                        rs(data)
                    })
                })

                let data = await Promise.all(keys.map(key => new Promise((rs, rj) => {
                    Reminder.redisClient.hmget(key, (err, data) => {
                        if (err) return rj(err)
                        rs(data)
                    })
                }))) as EmailForm[]
                rs({ keys, data })
            } catch (error) {
                rj(error)
            }
        })
    }

    private static deleteRemider(transactionId: string) {
        return new Promise((rs, rj) => {
            Reminder.redisClient.del('transaction:' + transactionId, (err, data) => {
                if (err) return rj(err)
                rs(data)
            })
        })
    }

}