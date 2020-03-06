import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
    @prop()
    public name?: string;
}

export const UserModel = getModelForClass(User, {}); // UserModel is a regular Mongoose Model with correct types