import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const { MONGODB_PROD_DATABASE_NAME, MONGODB_DEV_DATABASE_NAME, MONGODB_USERNAME, MONGODB_PASSWORD, ENV } = process.env;

export const databaseProviders = [
    MongooseModule.forRoot(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`, {
        dbName: ENV === "production" ? MONGODB_PROD_DATABASE_NAME : MONGODB_DEV_DATABASE_NAME,
    }),
    // MongooseModule.forRoot(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`, {
    //     dbName: MONGODB_DEV_DATABASE_NAME,
    //     connectionName: MONGODB_DEV_DATABASE_NAME,
    // }),
];
