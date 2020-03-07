
import { prop, getModelForClass, post, pre } from '@typegoose/typegoose';
import Bcrypt from 'bcrypt'

@pre<User>('save', async function (next) {
    this.password = await Bcrypt.hash(this.password, 10)
    next()
})
export class User {
    @prop({ required: true })
    public userName!: string;

    @prop({ required: true, unique: true })
    public email!: string;

    @prop({ required: true })
    public password!: string;

    @prop({ default: 0 })
    public remindTime!: number;

    @prop({})
    public createdAt!: Date

    @prop({})
    public updatedAt!: Date
}

export const UserModel = getModelForClass(User, {
    schemaOptions: { timestamps: true },
    options: { customName: 'users' }
})