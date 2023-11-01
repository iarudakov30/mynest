import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Event')
export class EventType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: boolean;
}
