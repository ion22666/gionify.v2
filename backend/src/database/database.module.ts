import { Module } from "@nestjs/common";
import { databaseProvider } from "./database.provider";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [databaseProvider],
    exports: [MongooseModule],
})
export class DatabaseModule {}
