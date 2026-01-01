import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1745658364593 implements MigrationInterface {
  name = 'Migrations1745658364593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contributors" ADD "fullname" character varying(50) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contributors" DROP COLUMN "fullname"`);
  }
}
