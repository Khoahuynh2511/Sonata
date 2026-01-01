import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1747230979645 implements MigrationInterface {
  name = 'Migrations1747230979645';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "listener_music_recommend_score" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "listener_id" bigint NOT NULL, "music_id" integer NOT NULL, "score" double precision NOT NULL DEFAULT '0', CONSTRAINT "PK_2ff63ec0363010240cd0879e830" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "listener_music_recommend_score" ADD CONSTRAINT "FK_68206d359b7ea4ff4b762ddbff2" FOREIGN KEY ("listener_id") REFERENCES "listeners"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "listener_music_recommend_score" ADD CONSTRAINT "FK_9dba2291e10bd2e2fcbe1ec5eb0" FOREIGN KEY ("music_id") REFERENCES "mucis"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "listener_music_recommend_score" DROP CONSTRAINT "FK_9dba2291e10bd2e2fcbe1ec5eb0"`
    );
    await queryRunner.query(
      `ALTER TABLE "listener_music_recommend_score" DROP CONSTRAINT "FK_68206d359b7ea4ff4b762ddbff2"`
    );
    await queryRunner.query(`DROP TABLE "listener_music_recommend_score"`);
  }
}
