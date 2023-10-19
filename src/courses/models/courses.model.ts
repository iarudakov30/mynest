// import mongoose from 'mongoose';
import { IsBoolean, IsInt, IsMongoId, IsString } from 'class-validator';

export class CoursesModel {
  @IsString()
  @IsMongoId()
  _id: string;
  @IsInt({ message: 'seqNo must be numeric' }) seqNo: number;
  @IsString({ always: false }) url: string;
  // @IsInt() id: number;
  @IsString() description: string;
  @IsBoolean() promo: boolean;
  @IsString() title: string;
  @IsInt() price: number;
}
