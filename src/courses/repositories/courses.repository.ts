import { Injectable } from '@nestjs/common';
import { CoursesModel } from '../models/courses.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectModel('Course') private courseModel: Model<CoursesModel>
  ) {}

  findAll(): Promise<CoursesModel[]> {
    return this.courseModel.find().populate('lessons');
  }

  getCourse(courseId: string): Promise<CoursesModel> {
    return this.courseModel.findById(courseId).exec();
  }

  updateCourse(
    courseId: string,
    changes: Partial<CoursesModel>
  ): Promise<CoursesModel> {
    return this.courseModel.findOneAndUpdate({ _id: courseId }, changes, {
      new: true
    });
  }

  deleteCourse(courseId: string) {
    return this.courseModel.findOneAndRemove({ _id: courseId });
  }

  async addCourse(course: Partial<CoursesModel>): Promise<CoursesModel> {
    const newCourse = new this.courseModel(course);
    await newCourse.save();
    return newCourse.toObject({ versionKey: false });
  }
}
