
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';

import { User } from '../user/model';

export class Transaction {
    @prop({ required: true, index: true })
    public creditor!: Ref<User>;

    @prop({ required: true, index: true })
    public debtor!: Ref<User>;

    @prop({ required: true })
    public value!: number

    @prop({ default: false })
    public isPaid!: boolean

    @prop({ default: new Date() })
    public lastRemind!: Date

    @prop({ default: new Date() })
    public createdAt!: Date
}

export const TransactionModel = getModelForClass(Transaction, {
    options: { customName: 'transactions' }
})