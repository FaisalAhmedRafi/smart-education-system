import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Course } from '../courses/course.entity';
import { Assignment } from '../assignments/assignment.entity';
import { Attendance } from '../attendance/attendance.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async addCourse(courseDto: { name: string; description: string }, teacherId: number) {
    const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });
    const course = this.courseRepository.create({ ...courseDto, teacher });
    return this.courseRepository.save(course);
  }

  async giveAssignment(assignmentDto: { title: string; description: string }, teacherId: number) {
    const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });
    const assignment = this.assignmentRepository.create({ ...assignmentDto, teacher });
    return this.assignmentRepository.save(assignment);
  }

  async trackAttendance(attendanceDto: { date: string; studentName: string; status: string }, teacherId: number) {
    const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });
    const attendance = this.attendanceRepository.create({ ...attendanceDto, teacher });
    return this.attendanceRepository.save(attendance);
  }

  async checkStudentAttendanceByName(studentName: string, date: string) {
    const attendance = await this.attendanceRepository.findOne({
      where: {
        studentName: studentName,
        date: date,
      },
    });

    if (attendance) {
      return {
        message: 'Student attendance found',
        data: attendance,
      };
    }

    return {
      message: `No attendance record found for student "${studentName}" on the specified date`,
    };
  }

  async viewCourses(teacherId: number) {
    return this.courseRepository.find({ where: { teacher: { id: teacherId } } });
  }

  async viewAssignments(teacherId: number) {
    return this.assignmentRepository.find({ where: { teacher: { id: teacherId } } });
  }

  async findByEmail(email: string): Promise<Teacher | undefined> {
    const teacher = await this.teacherRepository.findOne({ where: { email } });
    console.log('Teacher fetched from database:', teacher);
    return teacher;
  }
  
}
