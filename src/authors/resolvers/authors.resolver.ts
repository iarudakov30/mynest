import {
  Resolver,
  Args,
  Query,
  ID,
  Mutation,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Author } from '../models/author.model';
import { AuthorAddInput } from '../models/input/author-add.input';
import { Logger } from '@nestjs/common';

@Resolver(() => Author)
export class AuthorsResolver {
  private readonly logger: Logger = new Logger(AuthorsResolver.name);

  constructor(@InjectModel('Author') private authorModel: Model<Author>) {}

  @Query(() => [Author], { name: 'authors' })
  async getAuthors(): Promise<Author[]> {
    return this.authorModel.find().populate('posts');
  }

  @Query(() => Author, { name: 'author' })
  async getAuthor(@Args('id', { type: () => ID }) id: string): Promise<Author> {
    return this.authorModel.findOne({ _id: id }).populate('posts');
  }

  @Mutation(() => Author, { name: 'addAuthor' })
  async addAuthor(
    @Args('input', { type: () => AuthorAddInput }) input: AuthorAddInput
  ): Promise<Author> {
    const newAuthor = new this.authorModel(input);
    await newAuthor.save();
    return newAuthor.toObject({ versionKey: false });
  }

  @ResolveField('posts')
  async posts(@Parent() author: Author) {
    this.logger.debug('@ResolveField posts executed');
    return author.posts;
  }
}
