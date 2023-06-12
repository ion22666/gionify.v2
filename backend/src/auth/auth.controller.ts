import { Body, Controller, Get, Post, Req, Headers } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./dto/login.dto";
import { RegisterUserDTO } from "./dto/register.req.dto";
import { Request } from "express";
import { RegisterUserResponseDTO } from "./dto/register.res.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    loginUser(@Body() loginDto: LoginUserDTO): object {
        return this.authService.loginUser(loginDto);
    }

    @Post("register")
    registerUser(@Body() registerDto: RegisterUserDTO, @Req() req: Request): Promise<RegisterUserResponseDTO> {
        return this.authService.registerUser(registerDto);
    }
}
