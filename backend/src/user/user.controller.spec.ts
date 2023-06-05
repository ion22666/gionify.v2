import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("UserController", () => {
    let controller: UserController;

    const userObject = {
        username: "giovanni",
        password: "123",
        email: "giovanni@gmail.com",
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should be defined", () => {
        expect(controller.create(userObject));
    });
});
