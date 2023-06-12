import { Module } from "@nestjs/common";
import { databaseProviders } from "./database.provider";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [...databaseProviders],
    exports: [MongooseModule],
})
export class DatabaseModule {}
