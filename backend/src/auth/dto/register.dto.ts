import { User } from "src/user/schemas/user.schema";

export class RegisterUserDTO extends User {
    auth: {
        email: string;
        password: string;
    };
}
