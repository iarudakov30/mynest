import { Injectable } from '@nestjs/common';
import { CourseModel } from '../models/course.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CoursesRepository {
  constructor(@InjectModel('Course') private courseModel: Model<CourseModel>) {}

  findAll(): Promise<CourseModel[]> {
    return this.courseModel.find().populate('lessons');
  }

  getCourse(courseId: string): Promise<CourseModel> {
    return this.courseModel.findById(courseId).exec();
  }

  updateCourse(
    courseId: string,
    changes: Partial<CourseModel>
  ): Promise<CourseModel> {
    return this.courseModel.findOneAndUpdate({ _id: courseId }, changes, {
      new: true
    });
  }

  deleteCourse(courseId: string) {
    return this.courseModel.findOneAndRemove({ _id: courseId });
  }

  async addCourse(course: Partial<CourseModel>): Promise<CourseModel> {
    const newCourse = new this.courseModel(course);
    await newCourse.save();
    return newCourse.toObject({ versionKey: false });
  }
}
