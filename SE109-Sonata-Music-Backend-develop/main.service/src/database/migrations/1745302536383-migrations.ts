import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1745302536383 implements MigrationInterface {
  name = 'Migrations1745302536383';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admins" ADD "name" character varying(30) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "admins" ADD "picture" text`);
    await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "username" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "username" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "picture"`);
    await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "name"`);
  }
}
