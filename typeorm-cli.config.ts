import { Event } from 'src/events/entities/event.entity';
import { StudentRefactor1777480556714 } from 'src/migrations/1777480556714-StudentRefactor';
import { Course } from 'src/students/entites/course.entity';
import { Student } from 'src/students/entites/student.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Student, Course, Event],
  migrations: [StudentRefactor1777480556714],
});
