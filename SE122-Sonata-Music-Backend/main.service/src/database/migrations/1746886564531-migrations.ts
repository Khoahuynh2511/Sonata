import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746886564531 implements MigrationInterface {
  name = 'Migrations1746886564531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "listener_answer_quiz" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "listener_id" bigint NOT NULL, "quiz_id" bigint NOT NULL, CONSTRAINT "PK_678fa752340a72398f5c9568b07" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "mucis" DROP COLUMN "nationality"`);
    await queryRunner.query(`ALTER TABLE "listeners" DROP COLUMN "nationality"`);
    await queryRunner.query(
      `ALTER TABLE "listener_answer_quiz" ADD CONSTRAINT "FK_9d7232d214fff32358f1bd357e0" FOREIGN KEY ("listener_id") REFERENCES "listeners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "listener_answer_quiz" ADD CONSTRAINT "FK_0f1bb55616eb7cc6f34d608b80a" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listener_answer_quiz" DROP CONSTRAINT "FK_0f1bb55616eb7cc6f34d608b80a"`);
    await queryRunner.query(`ALTER TABLE "listener_answer_quiz" DROP CONSTRAINT "FK_9d7232d214fff32358f1bd357e0"`);
    await queryRunner.query(`ALTER TABLE "listeners" ADD "nationality" character varying(50)`);
    await queryRunner.query(`ALTER TABLE "mucis" ADD "nationality" character varying(50)`);
    await queryRunner.query(`DROP TABLE "listener_answer_quiz"`);
  }
}
