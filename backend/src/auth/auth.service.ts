import crypto from "crypto";
import * as argon2 from "argon2";
import JWT from "jsonwebtoken";

import { Injectable } from "@nestjs/common";
import { LoginUserDTO } from "./dto/login.dto";
import { User, UserDocument } from "src/user/schemas/user.schema";
import { UserService } from "src/user/user.service";
import { RegisterUserDTO } from "./dto/register.dto";

@Injectable()
export class AuthService {
    private readonly jwtSecreteKey: string = process.env.JWT_SECRET_KEY || crypto.randomBytes(10).toString();
    private readonly jwtLifespan = 30 * 24 * 60 * 60 * 1000; // 30 days

    constructor(private readonly userService: UserService) {}

    async loginUser(loginDto: LoginUserDTO) {
        const user = await this.userService.findOne({ "auth.email": loginDto.email });

        if (!user) throw new Error("Email not associated with any account");

        if (!(await this.checkPasswordForUser(user, loginDto.password))) throw new Error("Inccorect password");

        return {
            jwt: this.createJwtForUser(user),
            user: user,
        };
    }

    async registerUser(registerDto: RegisterUserDTO) {
        if (!this.verifyEmail(registerDto.auth.email)) throw new Error("Invalid email");

        if (await this.userService.findOne({ "auth.email": registerDto.auth.email })) throw new Error("Email already in use");

        if (!this.isValidPassoword(registerDto.auth.password)) throw new Error("Invalid password");

        registerDto.auth.password = await this.hashPassword(registerDto.auth.password);

        const user = await this.userService.create(registerDto);

        return {
            jwt: this.createJwtForUser(user),
            user: user,
        };
    }

    hashPassword(password: string) {
        return argon2.hash(password);
    }

    checkPasswordForUser(user: UserDocument, password: string): Promise<boolean> {
        return argon2.verify(user.auth.password, password);
    }

    createJwtForUser(user: UserDocument) {
        return JWT.sign({ id: user.id, expire: Date.now() + this.jwtLifespan }, this.jwtSecreteKey);
    }

    verifyJwtForUser(user: UserDocument, jwt: string) {
        return JWT.verify(jwt, this.jwtSecreteKey);
    }

    verifyEmail(email: string) {
        return typeof email === "string" && email.length;
    }
    isValidPassoword(password: string) {
        return typeof password === "string" && password.length > 8;
    }
}
