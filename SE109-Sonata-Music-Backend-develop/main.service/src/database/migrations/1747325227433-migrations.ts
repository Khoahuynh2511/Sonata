import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1747325227433 implements MigrationInterface {
    name = 'Migrations1747325227433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listeners" ADD "premium_expired_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listeners" DROP COLUMN "premium_expired_at"`);
    }

}
