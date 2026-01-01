import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1747474992786 implements MigrationInterface {
  name = 'Migrations1747474992786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "mucis" ADD "slug" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "mucis" DROP COLUMN "slug"`);
  }
}
