import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746092026219 implements MigrationInterface {
  name = 'Migrations1746092026219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "favorite_lists" DROP COLUMN "listender_id"`);
    await queryRunner.query(`ALTER TABLE "mucis" ADD "approved_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "favorite_lists" DROP CONSTRAINT "FK_c7257563ca773aa6cb637b12863"`);
    await queryRunner.query(`ALTER TABLE "favorite_lists" ALTER COLUMN "listener_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "favorite_lists" ADD CONSTRAINT "FK_c7257563ca773aa6cb637b12863" FOREIGN KEY ("listener_id") REFERENCES "listeners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "favorite_lists" DROP CONSTRAINT "FK_c7257563ca773aa6cb637b12863"`);
    await queryRunner.query(`ALTER TABLE "favorite_lists" ALTER COLUMN "listener_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "favorite_lists" ADD CONSTRAINT "FK_c7257563ca773aa6cb637b12863" FOREIGN KEY ("listener_id") REFERENCES "listeners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "mucis" DROP COLUMN "approved_at"`);
    await queryRunner.query(`ALTER TABLE "favorite_lists" ADD "listender_id" integer NOT NULL`);
  }
}
