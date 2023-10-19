import { LessonsRepository } from '../repositories/lessons.repository';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query
} from '@nestjs/common';
import { LessonModel } from '../models/lesson.model';
import { CoursesRepository } from '../repositories/courses.repository';

@Controller('lessons')
export class LessonsController {
  constructor(
    private lessonsDB: LessonsRepository,
    private coursesDB: CoursesRepository
  ) {}

  @Get()
  searchLessons(
    @Query('courseId') courseId: string,
    @Query('sortOrder') sortOrder = 'asc',
    @Query('pageNumber', ParseIntPipe) pageNumber = 0,
    @Query('pageSize', ParseIntPipe) pageSize = 3
  ) {
    if (!courseId) {
      throw new BadRequestException('courseId must be defined');
    }

    if (sortOrder != 'asc' && sortOrder != 'desc') {
      throw new BadRequestException('sortOrder must be asc or desc');
    }

    return this.lessonsDB.search(courseId, sortOrder, pageNumber, pageSize);
  }

  @Post()
  async addLesson(@Body() lesson: LessonModel): Promise<LessonModel> {
    // const course = await this.coursesDB.getCourse(lesson.courseId);
    return this.lessonsDB.addLesson(lesson);
  }
}
