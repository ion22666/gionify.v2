import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Model } from "mongoose";
import { UserI } from "../interfaces/user.interface";

@Schema()
export class User {
    @Prop({
        type: String,
        default: () => "User#" + Math.random().toString().slice(2, 8),
    })
    username: string;

    @Prop({
        type: Number,
        readonly: true,
        default: () => Date.now(),
    })
    readonly registeredAt: number;

    @Prop({
        _id: false,
        type: {
            email: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
            },
        },
    })
    auth: {
        email: string;
        password: string;
    };

    @Prop({
        _id: false,
        type: {
            google: {
                _id: false,
                type: {
                    email: {
                        type: String,
                        required: true,
                        unique: true,
                    },
                    password: {
                        type: String,
                    },
                },
            },
        },
    })
    oauth: {
        google: {
            email: string;
            password: string;
        };
    };

    static toJSON(user: Document<User>): UserI {
        return {
            id: user.id,
            email: user.auth?.email,
            username: user.username,
            registeredAt: user.registeredAt,
        };
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;
