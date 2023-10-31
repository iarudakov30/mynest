import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { Gender } from '../author.types';

@InputType()
export class AuthorAddInput {
  @Field()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @Field(() => Gender, { defaultValue: Gender.Other })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}
