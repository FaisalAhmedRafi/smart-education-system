import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { Teacher } from './teacher.entity';
import { Course } from '../courses/course.entity';
import { Assignment } from '../assignments/assignment.entity';
import { Attendance } from '../attendance/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, Course, Assignment, Attendance]),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
