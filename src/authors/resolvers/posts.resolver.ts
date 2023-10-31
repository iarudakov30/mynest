import { Resolver, Args, Query, ID, Mutation, Int } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Post } from '../models/post.model';
import { PostAddInput } from '../models/input/post-add.input';
import { PostEditInput } from '../models/input/post-edit.input';
import { EntityWithId } from '../models/author.types';

@Resolver(() => Post)
export class PostsResolver {
  constructor(@InjectModel('Post') private postModel: Model<Post>) {}

  @Query(() => [Post], { name: 'Posts' })
  async getPosts(): Promise<Post[]> {
    return this.postModel.find();
  }

  @Query(() => Post, { name: 'post' })
  async getPost(@Args('id', { type: () => ID }) id: string): Promise<Post> {
    return this.postModel.findOne({ _id: id });
  }

  @Mutation(() => Post, { name: 'addPost' })
  async addPost(
    @Args('input', { type: () => PostAddInput }) postInput: PostAddInput
  ): Promise<Post> {
    const newPost = new this.postModel(postInput);
    await newPost.save();
    return newPost.toObject({ versionKey: false });
  }

  @Mutation(() => Post, { name: 'editPost' })
  async editPost(
    @Args('id') id: string,
    @Args('input', { type: () => PostEditInput }) postInput: PostEditInput
  ): Promise<Post> {
    return this.postModel.findOneAndUpdate({ _id: id }, postInput, {
      new: true
    });
  }

  @Mutation(() => EntityWithId, { name: 'deletePost' })
  async deletePost(@Args('id') id: string): Promise<EntityWithId> {
    return this.postModel.findOneAndRemove({ _id: id });
  }
}
