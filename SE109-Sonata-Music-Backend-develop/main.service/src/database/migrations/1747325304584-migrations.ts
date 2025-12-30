import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1747325304584 implements MigrationInterface {
    name = 'Migrations1747325304584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listeners" ADD "points" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listeners" DROP COLUMN "points"`);
    }

}
