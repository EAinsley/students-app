import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './entites/student.entity';

@Injectable()
export class StudentsService {
  private students: Student[] = [
    {
      id: 1,
      name: 'John',
      promotion: 'Spring-2026',
      courses: ['JS', 'Java'],
    },
  ];

  create(createStudentDto: any) {
    this.students.push(createStudentDto);
    return createStudentDto;
  }

  findAll() {
    return this.students;
  }

  findOne(id: number) {
    const student = this.students.find((student) => student.id === +id);
    if (!student) {
      throw new NotFoundException(`Student with id ${id} does not exist`);
    }
    return student;
  }

  update(id: number, updateStudentDto) {
    const existingStudent = this.findOne(id);
    if (existingStudent) {
      // update the student
    }
  }

  remove(id: number) {
    const studentIndex = this.students.findIndex(
      (student) => student.id === +id,
    );
    if (studentIndex >= 0) {
      this.students.splice(studentIndex, 1);
    }
  }
}
