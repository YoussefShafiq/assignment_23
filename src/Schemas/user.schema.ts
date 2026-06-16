import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Gender, providers } from "src/utils/user.enum";

export interface IUser {
    userName: string;
    email: string;
    password: string;
    provider: providers;
    confirmEmail: boolean;
    profilePicture: string;
    coverPics: string[];
    friends: string[];
    age: number;
    phone: string;
    gender: Gender;
    changeCreditTime: Date;
    deletedAt: Date;
}

export type IHUser = HydratedDocument<IUser>;

@Schema({
    timestamps: true,
    strictQuery: true,
    virtuals: true,
    toJSON: {
        virtuals: true,
        getters: true
    },
    toObject: {
        virtuals: true,
        getters: true
    },
})
export class User {
    @Prop({ type: String, required: true })
    userName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: function () { return this.provider == providers.system } })
    password: string;

    @Prop({ type: String, enum: Object.values(providers), default: providers.system })
    provider?: providers;

    @Prop({ type: Boolean, default: false })
    confirmEmail?: boolean;

    @Prop({ type: String, required: false })
    profilePicture?: string;

    @Prop({ type: [String], required: false })
    coverPics?: [string];

    @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
    friends?: [Types.ObjectId];

    @Prop({ type: Number, required: false })
    age?: number;

    @Prop({ type: String, required: false })
    phone?: string;

    @Prop({ type: String, enum: Object.values(Gender), required: false })
    gender?: Gender;

    @Prop({ type: Date, required: false })
    changeCreditTime?: Date;

    @Prop({ type: Boolean, default: false })
    deletedAt?: Date;
}


export const UserSchema = SchemaFactory.createForClass(User);


UserSchema.pre("save", async function (this: IHUser & { wasNew: boolean }) {

})



export const userModel = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])