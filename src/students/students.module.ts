import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entites/student.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Course } from './entites/course.entity';
import { Event } from '../events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course, Event])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
