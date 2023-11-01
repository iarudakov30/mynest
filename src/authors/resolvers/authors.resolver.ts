import {
  Resolver,
  Args,
  Query,
  ID,
  Mutation,
  ResolveField,
  Parent
} from '@nestjs/graphql';

import { Logger } from '@nestjs/common';

import { Author } from '../models/author.model';
import { AuthorAddInput } from '../models/input/author-add.input';
import { AuthorRepository } from '../repositories/author.repository';
import { Post } from '../models/post.model';
import { PostRepository } from '../repositories/post.repository';

@Resolver(() => Author)
export class AuthorsResolver {
  private readonly logger: Logger = new Logger(AuthorsResolver.name);

  constructor(
    private authorRepository: AuthorRepository,
    private postRepository: PostRepository
  ) {}

  @Query(() => [Author], { name: 'authors' })
  async authors(): Promise<Author[]> {
    return this.authorRepository.getAuthors();
  }

  @Query(() => Author, { name: 'author' })
  async author(@Args('id', { type: () => ID }) id: string): Promise<Author> {
    return this.authorRepository.getAuthor(id);
  }

  @Mutation(() => Author, { name: 'addAuthor' })
  async addAuthor(
    @Args('input', { type: () => AuthorAddInput }) input: AuthorAddInput
  ): Promise<Author> {
    return this.authorRepository.createAuthor(input);
  }

  @Mutation(() => Author, { name: 'updateAuthor' })
  async updateAuthor(
    @Args('id') id: string,
    @Args('input', { type: () => AuthorAddInput }) input: AuthorAddInput
  ): Promise<Author> {
    return this.authorRepository.updateAuthor(id, input);
  }

  @ResolveField('posts')
  async posts(@Parent() author: Author): Promise<Post[]> {
    this.logger.debug('@ResolveField posts executed');
    return this.postRepository.getPostsByAuthor(author._id);
  }
}
