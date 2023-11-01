import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Author } from '../models/author.model';
import { AuthorAddInput } from '../models/input/author-add.input';

@Injectable()
export class AuthorRepository {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  async createAuthor(input: AuthorAddInput): Promise<Author> {
    const newAuthor = new this.authorModel(input);
    await newAuthor.save();
    return newAuthor.toObject({ versionKey: false });
  }

  async updateAuthor(id: string, input: AuthorAddInput): Promise<Author> {
    return this.authorModel.findOneAndUpdate({ _id: id }, input, {
      new: true
    });
  }

  async getAuthor(id: string): Promise<Author> {
    return this.authorModel.findOne({ _id: id });
  }

  async getAuthors(): Promise<Author[]> {
    return this.authorModel.find().populate('posts');
  }

  async assignPostsToAuthor(
    authorId: string,
    postIds: string[]
  ): Promise<Author> {
    const author: Author = await this.getAuthor(authorId);
    author.posts = [...author.posts, ...postIds];

    return this.authorModel.findOneAndUpdate({ _id: authorId }, author, {
      new: true
    });
  }
}
