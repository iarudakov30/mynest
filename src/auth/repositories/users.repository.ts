import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../models/user.model';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('User') private userModel: Model<UserModel>) {}

  getUser(email: string): Promise<UserModel> {
    return this.userModel.findOne({ email });
  }

  async addUser(user: UserModel): Promise<UserModel> {
    console.log('addUser', user);
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser.toObject({ versionKey: false });
  }
}
