import { IsString } from 'class-validator';
import { Course } from '../entites/course.entity';

export class CreateStudentDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly promotion: string;

  @IsString({ each: true })
  readonly courses: Course[];
}
