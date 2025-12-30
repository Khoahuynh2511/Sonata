import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746341139337 implements MigrationInterface {
  name = 'Migrations1746341139337';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "artist_followers" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "artist_id" integer NOT NULL, "listener_id" bigint NOT NULL, "id" SERIAL NOT NULL, CONSTRAINT "PK_9f767fb623655b02de6724fc8a1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_9391c4ded2e90a8a3cd98982be" ON "artist_followers" ("artist_id", "listener_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "listener_album_likes" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "album_id" bigint NOT NULL, "listener_id" bigint NOT NULL, "id" SERIAL NOT NULL, CONSTRAINT "PK_5060426713c10c2b2a004400c40" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_2356a7dc4a2cfd573828dbf39f" ON "listener_album_likes" ("album_id", "listener_id") `
    );
    await queryRunner.query(`ALTER TABLE "artists" ADD "followers" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "albums" ADD "likeCount" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(
      `ALTER TABLE "artist_followers" ADD CONSTRAINT "FK_2284889f3a1b0b9b3305955e94a" FOREIGN KEY ("listener_id") REFERENCES "listeners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "artist_followers" ADD CONSTRAINT "FK_5193496055adf1876bd868a60ce" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "listener_album_likes" ADD CONSTRAINT "FK_b067d73fe0d058f4e3524fab1d1" FOREIGN KEY ("listener_id") REFERENCES "listeners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "listener_album_likes" ADD CONSTRAINT "FK_d0b4e8ec320d79af76839ea277b" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listener_album_likes" DROP CONSTRAINT "FK_d0b4e8ec320d79af76839ea277b"`);
    await queryRunner.query(`ALTER TABLE "listener_album_likes" DROP CONSTRAINT "FK_b067d73fe0d058f4e3524fab1d1"`);
    await queryRunner.query(`ALTER TABLE "artist_followers" DROP CONSTRAINT "FK_5193496055adf1876bd868a60ce"`);
    await queryRunner.query(`ALTER TABLE "artist_followers" DROP CONSTRAINT "FK_2284889f3a1b0b9b3305955e94a"`);
    await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "likeCount"`);
    await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "followers"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_2356a7dc4a2cfd573828dbf39f"`);
    await queryRunner.query(`DROP TABLE "listener_album_likes"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9391c4ded2e90a8a3cd98982be"`);
    await queryRunner.query(`DROP TABLE "artist_followers"`);
  }
}
