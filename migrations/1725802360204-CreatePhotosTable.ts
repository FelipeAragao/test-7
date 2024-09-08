import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePhotosTable1725802360204 implements MigrationInterface {
    name = 'CreatePhotosTable1725802360204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location" character varying, "path" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "dealId" uuid, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_f6a3cd87f49fbba21c928aac0ad" FOREIGN KEY ("dealId") REFERENCES "deals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_f6a3cd87f49fbba21c928aac0ad"`);
        await queryRunner.query(`DROP TABLE "photos"`);
    }

}
