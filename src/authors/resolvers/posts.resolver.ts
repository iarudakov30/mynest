import { Resolver, Args, Query, ID, Mutation } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { Post } from '../models/post.model';
import { PostAddInput } from '../models/input/post-add.input';
import { PostEditInput } from '../models/input/post-edit.input';
import { EntityWithId } from '../models/author.types';
import { PostRepository } from '../repositories/post.repository';
import { AuthorRepository } from '../repositories/author.repository';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private postRepository: PostRepository,
    private authorRepository: AuthorRepository
  ) {}

  @Query(() => [Post], { name: 'posts' })
  async posts(): Promise<Post[]> {
    return this.postRepository.getPosts();
  }

  @Query(() => Post, { name: 'post' })
  async post(
    @Args('id', { type: () => ID }) id: Types.ObjectId
  ): Promise<Post> {
    return this.postRepository.getPost(id);
  }

  @Mutation(() => Post, { name: 'addPost' })
  async addPost(
    @Args('input', { type: () => PostAddInput }) input: PostAddInput
  ): Promise<Post> {
    const post: Post = await this.postRepository.createPost(input);
    await this.authorRepository.assignPostsToAuthor(post.authorId, [post._id]);
    return post;
  }

  @Mutation(() => Post, { name: 'editPost' })
  async editPost(
    @Args('id') id: string,
    @Args('input', { type: () => PostEditInput }) postInput: PostEditInput
  ): Promise<Post> {
    return this.postRepository.updatePost(id, postInput);
  }

  @Mutation(() => EntityWithId, { name: 'deletePost' })
  async deletePost(@Args('id') id: string): Promise<EntityWithId> {
    return this.postRepository.deletePost(id);
  }
}
