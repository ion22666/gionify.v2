import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { FilterQuery, Model, ObjectId } from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly UserModel: Model<User>) {}
    create(createUserDto: CreateUserDto): Promise<UserDocument> {
        return this.UserModel.create(createUserDto);
    }

    findAll(filter?: FilterQuery<User>): Promise<UserDocument[]> {
        return filter ? this.UserModel.find(filter) : this.UserModel.find();
    }

    findOneById(id: ObjectId): Promise<UserDocument | null> {
        return this.UserModel.findById(id);
    }

    findOne(data: FilterQuery<User>): Promise<UserDocument | null> {
        return this.UserModel.findOne(data);
    }

    update(id: ObjectId, updateUserDto: UpdateUserDto) {
        return this.UserModel.updateOne({ id }, updateUserDto);
    }

    remove(id: ObjectId) {
        return this.UserModel.deleteOne({ id });
    }
}
