import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1745551972294 implements MigrationInterface {
  name = 'Migrations1745551972294';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "username" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "username" DROP NOT NULL`);
  }
}
