import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./schemas/user.schema";
import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });
@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
