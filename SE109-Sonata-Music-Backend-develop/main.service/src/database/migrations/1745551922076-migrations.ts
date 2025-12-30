import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1745551922076 implements MigrationInterface {
  name = 'Migrations1745551922076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "username" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "listeners" DROP COLUMN "gender"`);
    await queryRunner.query(`ALTER TABLE "listeners" ADD "gender" character varying(10)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listeners" DROP COLUMN "gender"`);
    await queryRunner.query(`ALTER TABLE "listeners" ADD "gender" smallint`);
    await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "username" SET NOT NULL`);
  }
}
