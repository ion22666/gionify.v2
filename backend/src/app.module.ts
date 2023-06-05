import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { UserModule } from "./user/user.module";
import { DatabaseModule } from "./database/database.module";
import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });
@Module({
    imports: [
        UserModule,
        MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`, {
            dbName: process.env.MONGODB_PROD_DATABASE_NAME,
            connectionName: process.env.MONGODB_PROD_DATABASE_NAME,
        }),
        MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`, {
            dbName: process.env.MONGODB_DEV_DATABASE_NAME,
            connectionName: process.env.MONGODB_DEV_DATABASE_NAME,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AppModule {}
