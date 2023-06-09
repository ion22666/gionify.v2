import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly UserModel: Model<User>) {}

    create(user: User): Promise<UserDocument> {
        return this.UserModel.create(user);
    }

    findAll(): Promise<UserDocument[]> {
        return this.UserModel.find();
    }

    findOneById = this.UserModel.findById<User>;

    async findOne(user: FilterQuery<User>) {
        return await this.UserModel.findOne(user);
    }

    updateOne = this.UserModel.updateOne<User>;

    deleteOne = this.UserModel.deleteOne;
}
