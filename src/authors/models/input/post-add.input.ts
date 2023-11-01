import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostAddInput {
  @Field()
  title: string;

  @Field()
  authorId: string;

  @Field({ nullable: true })
  description: string;
}
