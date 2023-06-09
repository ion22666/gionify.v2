import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export const databaseProvider = MongooseModule.forRoot(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`,
    {
        dbName: process.env.ENV === "production" ? process.env.MONGODB_DEV_DATABASE_NAME : process.env.MONGODB_DEV_DATABASE_NAME,
    }
);
