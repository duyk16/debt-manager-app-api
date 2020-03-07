
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';

import { Transaction } from '../transaction/model';

export class Payment {
    @prop({ required: true })
    public transaction!: Ref<Transaction>;

    @prop({ default: new Date() })
    public createdAt!: Date
}

export const PaymentModel = getModelForClass(Payment, {
    options: { customName: 'payments' }
})