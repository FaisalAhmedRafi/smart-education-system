import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    UseGuards,
    Request,
    Query,
  } from '@nestjs/common';
  import { TeachersService } from './teachers.service';
  import { AuthGuard } from '@nestjs/passport';
  
  @Controller('teachers')
  @UseGuards(AuthGuard('jwt'))
  export class TeachersController {
    constructor(private readonly teachersService: TeachersService) {}
  
    @Post('add-course')
    addCourse(@Body() courseDto: { name: string; description: string }, @Request() req) {
      return this.teachersService.addCourse(courseDto, req.user.userId);
    }
  
    @Post('give-assignment')
    assignHomework(@Body() assignmentDto: { title: string; description: string }, @Request() req) {
      return this.teachersService.giveAssignment(assignmentDto, req.user.userId);
    }
  
    @Post('track-attendance')
    trackAttendance(@Body() attendanceDto: { date: string; studentName: string; status: string }, @Request() req) {
      return this.teachersService.trackAttendance(attendanceDto, req.user.userId);
    }

    @Get('attendance/:name')
    checkStudentAttendance(
      @Param('name') studentName: string,
      @Query('date') date: string,
    ) {
      return this.teachersService.checkStudentAttendanceByName(studentName, date);
    }
  
    @Get('view-courses')
    viewCourses(@Request() req) {
      return this.teachersService.viewCourses(req.user.userId);
    }
  
    @Get('view-assignments')
    viewAssignments(@Request() req) {
      return this.teachersService.viewAssignments(req.user.userId);
    }
  }
  