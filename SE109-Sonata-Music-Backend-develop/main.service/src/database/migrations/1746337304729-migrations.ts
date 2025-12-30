import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746337304729 implements MigrationInterface {
  name = 'Migrations1746337304729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "mucis" ADD "listenCount" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "artists" ADD "viewCount" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "albums" ADD "viewCount" integer NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "viewCount"`);
    await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "viewCount"`);
    await queryRunner.query(`ALTER TABLE "mucis" DROP COLUMN "listenCount"`);
  }
}
