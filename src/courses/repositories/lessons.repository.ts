import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LessonModel } from '../models/lesson.model';

export class LessonsRepository {
  constructor(
    @InjectModel('Lesson') private lessonsModel: Model<LessonModel>
  ) {}

  search(
    courseId: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ) {
    console.log(
      'searching for lessons ',
      courseId,
      sortOrder,
      pageNumber,
      pageSize
    );

    return this.lessonsModel
      .find(
        {
          courseId: courseId
        },
        null,
        {
          skip: (pageNumber - 1) * pageSize,
          limit: pageSize,
          sort: {
            seqNo: sortOrder
          }
        }
      )
      .populate('courseId', 'title');
  }

  async addLesson(lesson: LessonModel): Promise<LessonModel> {
    console.log('addLesson', lesson);
    const newLesson = new this.lessonsModel(lesson);
    await newLesson.save();
    return newLesson.toObject({ versionKey: false });
  }
}
