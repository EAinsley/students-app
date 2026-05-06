import { IsObject, IsString } from 'class-validator';
import { Course } from '../entites/course.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ description: 'this is a name' })
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly promotion: string;

  @ApiProperty()
  @IsObject({ each: true })
  readonly courses: Course[];
}
