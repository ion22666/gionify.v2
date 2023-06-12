import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { Connection } from "mongoose";
import { getConnectionToken } from "@nestjs/mongoose";
import { RegisterUserDTO } from "src/auth/dto/register.req.dto";
import { AuthController } from "src/auth/auth.controller";
import { RegisterUserResponseDTO } from "src/auth/dto/register.res.dto";

const validRegisterUserDTO: RegisterUserDTO = {
    email: "giovanni@gmail.com",
    password: "123456789",
    username: "Giovanni",
};

describe("AppController (e2e)", () => {
    let app: INestApplication;
    let connection: Connection;
    let req: request.SuperTest<request.Test>;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        connection = moduleFixture.get<Connection>(getConnectionToken());
        await connection.dropDatabase();
    });

    afterAll(async () => {
        await app.close();
        await connection.close();
    });

    beforeEach(() => {
        req = request(app.getHttpServer());
    });

    it("/auth/register should create user in db and return a JWT", async () => {
        const res = await req.post("/auth/register").send(validRegisterUserDTO);

        expect(res.statusCode).toBeGreaterThanOrEqual(200);
        expect(res.body).toBeInstanceOf(Object);

        const { jwt, user } = res.body;

        expect(jwt.toString().split(".").length).toBe(3);

        expect(user.username).toBe(validRegisterUserDTO.username);
        expect(user.email).toBe(validRegisterUserDTO.email);
        expect(user.regi).toBe(validRegisterUserDTO.username);
        expect(user.auth).toBeUndefined();
        expect(user.oauth).toBeUndefined();
    });
});
