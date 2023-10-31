import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsObject,
  IsString
} from 'class-validator';
import { LessonModel } from './lesson.model';

export class CourseModel {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsInt({ message: 'seqNo must be numeric' })
  seqNo: number;

  @IsString({ always: false })
  url: string;

  @IsString()
  description: string;

  @IsBoolean()
  promo: boolean;

  @IsString()
  title: string;

  @IsInt()
  price: number;

  @IsObject()
  lessons: LessonModel[];
}
