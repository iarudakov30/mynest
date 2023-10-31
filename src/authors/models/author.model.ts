import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from './post.model';
import { Gender } from './author.types';

@ObjectType()
export class Author {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field()
  name: string;

  @Field({ defaultValue: true })
  status: string;

  @Field(() => Gender, { defaultValue: Gender.Other })
  gender: Gender;

  @Field(() => [Post], { defaultValue: [] })
  posts: Post[];
}
