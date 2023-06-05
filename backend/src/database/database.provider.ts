import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export const databaseProviders = [
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`, {
        dbName: process.env.MONGODB_PROD_DATABASE_NAME,
        connectionName: process.env.MONGODB_PROD_DATABASE_NAME,
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`, {
        dbName: process.env.MONGODB_DEV_DATABASE_NAME,
        connectionName: process.env.MONGODB_DEV_DATABASE_NAME,
    }),
];
