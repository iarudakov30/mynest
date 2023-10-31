import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MinLength
} from 'class-validator';

export class LessonModel {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  _id: number;

  @IsString()
  @MinLength(5)
  description: string;

  @IsString()
  duration: string;

  @IsInt()
  @IsNotEmpty()
  seqNo: number;

  @IsInt()
  @IsNotEmpty()
  courseId: string;
}
