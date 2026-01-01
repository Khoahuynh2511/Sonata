import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746837959736 implements MigrationInterface {
  name = 'Migrations1746837959736';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "mucis" ADD "nationality" character varying(50)`);
    await queryRunner.query(`ALTER TABLE "listeners" ADD "nationality" character varying(50)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listeners" DROP COLUMN "nationality"`);
    await queryRunner.query(`ALTER TABLE "mucis" DROP COLUMN "nationality"`);
  }
}
