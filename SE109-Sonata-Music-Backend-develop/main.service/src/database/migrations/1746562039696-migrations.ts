import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746562039696 implements MigrationInterface {
  name = 'Migrations1746562039696';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" ADD "description" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
  }
}
