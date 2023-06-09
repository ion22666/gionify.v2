import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class User {
    @Prop({
        type: String,
        default: "User#" + Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join(""),
    })
    username: string;

    @Prop({
        type: Number,
        default: () => Date.now(),
    })
    registeredAt?: number;

    @Prop({
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
        type: {
            google: {
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
        google: {
            email: string;
            password: string;
        };
    };
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;
