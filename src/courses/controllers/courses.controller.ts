import {
  BadRequestException,
  NotFoundException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UseGuards
} from '@nestjs/common';
import { CoursesRepository } from '../repositories/courses.repository';
import { CourseModel } from '../models/course.model';
import { AuthenticationGuard } from '../../guards/authentication.guard';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('courses')
@UseGuards(AuthenticationGuard)
export class CoursesController {
  constructor(private coursesDB: CoursesRepository) {}

  @Post()
  @UseGuards(AdminGuard)
  async createCourse(@Body() course: CourseModel): Promise<CourseModel> {
    return this.coursesDB.addCourse(course);
  }

  @Get()
  async findAllCourses(): Promise<CourseModel[]> {
    return this.coursesDB.findAll();
  }

  @Get(':id')
  async getCourse(@Param('id') courseId: string): Promise<CourseModel> {
    const course = await this.coursesDB.getCourse(courseId);

    if (!course) {
      throw new NotFoundException('Could not find course with id ' + courseId);
    }

    return course;
  }

  @Put(':courseId')
  @UseGuards(AdminGuard)
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() changes: CourseModel
  ): Promise<CourseModel> {
    if (changes._id) {
      throw new BadRequestException("Can't update course id");
    }
    return this.coursesDB.updateCourse(courseId, changes);
  }

  @Delete(':courseId')
  @UseGuards(AdminGuard)
  async deleteCourse(@Param('courseId') courseId: string) {
    console.log('deleteCourse', courseId);
    return this.coursesDB.deleteCourse(courseId);
  }
}
