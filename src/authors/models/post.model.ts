import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class Post {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  title: string;

  @Field()
  authorId: string;

  @Field({ nullable: true })
  description: string;
}
