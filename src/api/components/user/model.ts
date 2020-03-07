
import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import Bcrypt from 'bcrypt'

@pre<User>('save', async function (next) {
    this.password = await Bcrypt.hash(this.password, 10)
    next()
})
export class User {
    @prop({ required: true })
    public userName!: string

    @prop({ required: true, unique: true })
    public email!: string

    @prop({ required: true })
    public password!: string

    @prop({ default: 0 })
    public totalDebt!: number

    @prop({ default: 0 })
    public totalCredit!: number

    @prop({ default: 0 })
    public remindTime!: number;

    @prop({ default: new Date() })
    public createdAt!: Date

    @prop({ default: new Date() })
    public updatedAt!: Date
}

export const UserModel = getModelForClass(User, {
    schemaOptions: { timestamps: true },
    options: { customName: 'users' }
})