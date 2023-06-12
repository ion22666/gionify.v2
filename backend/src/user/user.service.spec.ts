import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { MongooseModule, getConnectionToken } from "@nestjs/mongoose";
import { User, UserDocument, UserSchema } from "./schemas/user.schema";
import { DatabaseModule } from "../database/database.module";
import { Connection, Types } from "mongoose";

const userForTest: User = {
    username: "Giovanni",
    auth: {
        email: "giovanni@gmail.com",
        password: "12345678",
    },
};

describe("UserService", () => {
    let service: UserService;
    let connection: Connection;
    let userDocRef: UserDocument;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);
        connection = module.get<Connection>(getConnectionToken());
        await connection.dropDatabase();
    });

    afterAll(async () => {
        await connection.close();
    });

    it("should create user correctly", async () => {
        userDocRef = await service.create(userForTest);

        expect(userDocRef).toBeDefined();
        expect(Types.ObjectId.isValid(userDocRef._id)).toBe(true);
        expect(Types.ObjectId.isValid(userDocRef.id)).toBe(true);
        expect(typeof userDocRef.registeredAt === "number").toBe(true);
        expect(userDocRef.auth?.password).toBe(userForTest.auth?.password);
    });

    it("should find user", async () => {
        const userDoc = await service.findOneById(userDocRef.id);

        expect(userDoc).toBeDefined();
        if (!userDoc) return;

        expect(userDoc.id).toBe(userDocRef.id);

        expect((await service.findOne(userForTest))?.id).toBe(userDoc.id);
    });

    it("should delete user", async () => {
        const deleteResult = await service.deleteOne(userForTest);
        expect(deleteResult.deletedCount).toBe(1);

        expect(await service.findOneById(userDocRef.id)).toBeFalsy();
    });
});
