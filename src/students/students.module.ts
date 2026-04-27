import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entites/student.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Course } from './entites/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
