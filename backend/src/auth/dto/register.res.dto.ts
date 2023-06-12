import { UserI } from "src/user/interfaces/user.interface";

export class RegisterUserResponseDTO {
    jwt: string;
    user: UserI;
}
