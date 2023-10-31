import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Types } from 'mongoose';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

@ObjectType()
export class EntityWithId {
  constructor(id: Types.ObjectId) {
    this._id = id;
  }

  @Field(() => ID)
  _id: Types.ObjectId;
}

registerEnumType(Gender, { name: 'Gender' });
