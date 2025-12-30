import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1748076986846 implements MigrationInterface {
  name = 'Migrations1748076986846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contributors" ADD "points" integer NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contributors" DROP COLUMN "points"`);
  }
}
