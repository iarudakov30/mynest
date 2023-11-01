import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Post } from '../models/post.model';
import { PostAddInput } from '../models/input/post-add.input';
import { EntityWithId } from '../models/author.types';
import { PostEditInput } from '../models/input/post-edit.input';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async getPost(id: Types.ObjectId): Promise<Post> {
    return this.postModel.findOne({ _id: id });
  }

  async getPosts(): Promise<Post[]> {
    return this.postModel.find();
  }

  async getPostsByAuthor(id: string): Promise<Post[]> {
    return this.postModel.find({ authorId: id });
  }

  async createPost(input: PostAddInput): Promise<Post> {
    const newPost = new this.postModel(input);
    await newPost.save();
    return newPost.toObject({ versionKey: false });
  }

  async updatePost(id: string, input: PostEditInput): Promise<Post> {
    return this.postModel.findOneAndUpdate({ _id: id }, input, {
      new: true
    });
  }

  async deletePost(id: string): Promise<EntityWithId> {
    return this.postModel.findOneAndRemove({ _id: id });
  }
}
