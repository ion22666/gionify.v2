import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { DatabaseModule } from "src/database/database.module";

describe("UserService", () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], process.env.MONGODB_DEV_DATABASE_NAME)],
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
