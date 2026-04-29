import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './entites/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Course } from './entites/course.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {
    const databaseHost = this.configService.get<string>('DATABASE_HOST');
    console.log(databaseHost);
  }

  async create(createStudentDto: CreateStudentDto) {
    const courses = await Promise.all(
      createStudentDto.courses.map(({ name }) =>
        this.preloadCourseByName(name),
      ),
    );

    const student = this.studentRepository.create({
      ...createStudentDto,
      courses,
    });

    return this.studentRepository.save(student);
  }

  async recommendStudent(student: Student) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      student.recommendations++;

      const recommendedEvent = new Event();
      recommendedEvent.name = 'recommended_student';
      recommendedEvent.type = 'student';
      recommendedEvent.payload = { studentId: student.id };

      await queryRunner.manager.save(student);
      await queryRunner.manager.save(recommendedEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { offset, limit } = paginationQuery;
    return this.studentRepository.find({
      relations: {
        courses: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        courses: true,
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

  private async preloadCourseByName(name: string): Promise<Course> {
    const existingCourse = await this.courseRepository.findOne({
      where: {
        name, // name: name
      },
    });

    if (existingCourse) {
      return existingCourse;
    }

    return this.courseRepository.create({ name }); // name: name
  }
}
