import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746092224483 implements MigrationInterface {
  name = 'Migrations1746092224483';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "mucis" DROP COLUMN "picture"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "mucis" ADD "picture" text`);
  }
}
