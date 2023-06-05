import { PartialType } from "@nestjs/mapped-types";
import { User } from "../schemas/user.schema";

export class CreateUserDto {
    email: string;
    password: string;
    username?: string;
}
