import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  authorId: string;

  @Field({ nullable: true })
  description: string;
}
