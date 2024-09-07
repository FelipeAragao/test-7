import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGoogleId1725727204536 implements MigrationInterface {
    name = 'AddGoogleId1725727204536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "google_id" character varying(32)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_id"`);
    }

}
