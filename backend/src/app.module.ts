import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

@Module({
    imports: [
        MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`, {
            dbName: process.env.MONGODB_DATABASE_NAME,
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AppModule {}
