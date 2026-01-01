import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746095319159 implements MigrationInterface {
  name = 'Migrations1746095319159';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quizzes" DROP CONSTRAINT "FK_11fd1e7a4d0e74622e0f74bb917"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP CONSTRAINT "FK_4eb3cacff4db73542f37b5a4358"`);
    await queryRunner.query(`ALTER TABLE "mucis" DROP CONSTRAINT "FK_c88d639a8ffe0f5a081fb958049"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "mucis" DROP COLUMN "approved_by"`);
    await queryRunner.query(`ALTER TABLE "mucis" DROP COLUMN "uploaded_by"`);
    await queryRunner.query(`ALTER TABLE "quizzes" ADD "created_by_id" bigint NOT NULL`);
    await queryRunner.query(`ALTER TABLE "quizzes" ADD "updated_by_id" bigint`);
    await queryRunner.query(`ALTER TABLE "mucis" ADD "approved_by_id" bigint`);
    await queryRunner.query(`ALTER TABLE "mucis" ADD "uploaded_by_id" bigint NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "quizzes" ADD CONSTRAINT "FK_6ba8dfe13404afbe35d3e312887" FOREIGN KEY ("created_by_id") REFERENCES "contributors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "quizzes" ADD CONSTRAINT "FK_1834defd2ed3e1da02196837ded" FOREIGN KEY ("updated_by_id") REFERENCES "contributors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "mucis" ADD CONSTRAINT "FK_ddbdc2b22d386eea7b2f04ecb0c" FOREIGN KEY ("approved_by_id") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "mucis" ADD CONSTRAINT "FK_d91090544ed5294ceec370cb1dd" FOREIGN KEY ("uploaded_by_id") REFERENCES "contributors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "mucis" DROP CONSTRAINT "FK_d91090544ed5294ceec370cb1dd"`);
    await queryRunner.query(`ALTER TABLE "mucis" DROP CONSTRAINT "FK_ddbdc2b22d386eea7b2f04ecb0c"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP CONSTRAINT "FK_1834defd2ed3e1da02196837ded"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP CONSTRAINT "FK_6ba8dfe13404afbe35d3e312887"`);
    await queryRunner.query(`ALTER TABLE "mucis" DROP COLUMN "uploaded_by_id"`);
    await queryRunner.query(`ALTER TABLE "mucis" DROP COLUMN "approved_by_id"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "updated_by_id"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "created_by_id"`);
    await queryRunner.query(`ALTER TABLE "mucis" ADD "uploaded_by" bigint NOT NULL`);
    await queryRunner.query(`ALTER TABLE "mucis" ADD "approved_by" integer`);
    await queryRunner.query(`ALTER TABLE "quizzes" ADD "updated_by" bigint`);
    await queryRunner.query(`ALTER TABLE "quizzes" ADD "created_by" bigint`);
    await queryRunner.query(
      `ALTER TABLE "mucis" ADD CONSTRAINT "FK_c88d639a8ffe0f5a081fb958049" FOREIGN KEY ("uploaded_by") REFERENCES "contributors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "quizzes" ADD CONSTRAINT "FK_4eb3cacff4db73542f37b5a4358" FOREIGN KEY ("created_by") REFERENCES "contributors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "quizzes" ADD CONSTRAINT "FK_11fd1e7a4d0e74622e0f74bb917" FOREIGN KEY ("updated_by") REFERENCES "contributors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
