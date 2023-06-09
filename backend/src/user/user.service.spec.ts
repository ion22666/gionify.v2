import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { MongooseModule, getConnectionToken } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { DatabaseModule } from "../database/database.module";
import mongoose, { Connection } from "mongoose";

const userForTest: User = {
    username: "Giovanni",
    auth: {
        email: "giovanni@gmail.com",
        password: "12345678",
    },
};
describe("UserService", () => {
    let service: UserService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);
        const connection = module.get<Connection>(Connection);
        console.log("connection", connection);
        await connection.dropDatabase();
    });

    it("should be defined", async () => {
        expect(await service.create(userForTest)).toBeDefined();
    });
});
