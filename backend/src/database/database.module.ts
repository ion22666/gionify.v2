import { Module } from "@nestjs/common";
import { databaseProviders } from "./database.provider";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [...databaseProviders, MongooseModule],
    exports: [MongooseModule],
})
export class DatabaseModule {}
