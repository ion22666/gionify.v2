import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { UserModule } from "./user/user.module";
import { DatabaseModule } from "./database/database.module";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });
@Module({
    imports: [UserModule, DatabaseModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AppModule {}
