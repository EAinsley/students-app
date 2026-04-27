import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './entites/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  findAll() {
    return this.studentRepository.find();
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!student) {
      throw new NotFoundException(`Student with id ${id} does not exist`);
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.preload({
      id: id,
      ...updateStudentDto,
    });
    if (!student) {
      throw new NotFoundException(`Student with id ${id} does not exist`);
    }
    return this.studentRepository.save(student);
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    return this.studentRepository.remove(student);
  }
}
