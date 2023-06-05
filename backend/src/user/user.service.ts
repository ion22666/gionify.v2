import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly UserModel: Model<User>) {}

    create = this.UserModel.create;

    findAll = this.UserModel.find;

    findOneById = this.UserModel.findById;

    findOne = this.UserModel.findOne;

    updateOne = this.UserModel.updateOne;

    deleteOne = this.UserModel.deleteOne;
}
