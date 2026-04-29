import { MigrationInterface, QueryRunner } from 'typeorm';

export class StudentRefactor1777480556714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE student RENAME COLUMN "name" TO "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE student RENAME COLUMN "title" TO "name"`,
    );
  }
}
