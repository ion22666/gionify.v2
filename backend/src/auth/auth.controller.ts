import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./dto/login.dto";
import { RegisterUserDTO } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    loginUser(@Body() loginDto: LoginUserDTO): object {
        return this.authService.loginUser(loginDto);
    }

    @Post("register")
    registerUser(@Body() registerDto: RegisterUserDTO) {
        return this.authService.registerUser(registerDto);
    }
}
