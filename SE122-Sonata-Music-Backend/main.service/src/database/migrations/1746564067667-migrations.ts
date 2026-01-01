import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746564067667 implements MigrationInterface {
  name = 'Migrations1746564067667';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" ADD "viewCount" integer NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "viewCount"`);
  }
}
