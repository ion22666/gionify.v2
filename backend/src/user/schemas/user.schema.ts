import { DocumentMethods } from "global";
import { HydratedDocument, InferSchemaType, Schema as Schema1 } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export interface UserI {
    email?: string;
    username: string;
    registeredAt: number;
}

export interface UserMehods extends DocumentMethods<UserI> {
    createJWT(this: UserDocument): string;
}

const userMethods: UserMehods = {
    sanitize() {
        return {
            id: this.id,
            username: this.username,
            email: this.username,
            registeredAt: this.registeredAt,
        };
    },
    createJWT() {
        return "";
    },
};

export const UserSchema1 = new Schema1(
    {
        username: {
            type: String,
            required: false,
            default: () => "User#" + Math.random().toString().slice(2, 8),
        },

        registeredAt: {
            type: Number,
            required: false,
            readonly: true,
            default: () => Date.now(),
        },

        auth: {
            email: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
                validate: (p: string) => p.length > 8,
            },
        },
    },
    {
        methods: userMethods,
    }
);

@Schema({ ["methods" + ""]: userMethods })
export class User {
    @Prop({
        type: String,
        default: () => "User#" + Math.random().toString().slice(2, 8),
    })
    username?: string;

    @Prop({
        type: Number,
        readonly: true,
        default: () => Date.now(),
    })
    readonly registeredAt?: number;

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
    auth?: {
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
    oauth?: {
        google?: {
            email: string;
            password: string;
        };
    };
}

export type User1 = InferSchemaType<typeof UserSchema>;

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User, UserMehods>;
