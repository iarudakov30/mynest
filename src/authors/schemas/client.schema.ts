import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Gender } from '../models/author.types';
import { Post } from '../models/post.model';

@ObjectType()
@Schema({
  timestamps: true
})
export class Client {
  @Field(() => ID, { nullable: true })
  _id: mongoose.Types.ObjectId;

  @Field()
  @Prop({
    type: String,
    required: true
  })
  name: string;

  @Field({ defaultValue: true })
  @Prop({
    type: Boolean,
    defaultValue: true,
    required: true
  })
  status: boolean;

  @Field(() => Gender, { defaultValue: Gender.Other })
  @Prop({
    type: String,
    enum: Gender,
    required: true,
    default: Gender.Other
  })
  gender: Gender;

  @Field(() => [Post], { defaultValue: [], nullable: true })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Post.name
  })
  posts: Post[];
}

export const ClientSchema: mongoose.Schema<Client> =
  SchemaFactory.createForClass(Client);
