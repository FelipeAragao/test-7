import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndLocationTables1725546072703 implements MigrationInterface {
    name = 'CreateUserAndLocationTables1725546072703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "lat" numeric(10,7) NOT NULL, "lng" numeric(10,7) NOT NULL, "address" character varying(255) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(100) NOT NULL, "zipcode" character varying(20) NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "login" character varying(64) NOT NULL, "password" character varying(64) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_location_locations" ("usersId" uuid NOT NULL, "locationsId" integer NOT NULL, CONSTRAINT "PK_133995e54262cc41a4e3024af7d" PRIMARY KEY ("usersId", "locationsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5783e1a0c3538f04301ef43b63" ON "users_location_locations" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5a50773b5267d26d55cf8586c9" ON "users_location_locations" ("locationsId") `);
        await queryRunner.query(`ALTER TABLE "users_location_locations" ADD CONSTRAINT "FK_5783e1a0c3538f04301ef43b637" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_location_locations" ADD CONSTRAINT "FK_5a50773b5267d26d55cf8586c9b" FOREIGN KEY ("locationsId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_location_locations" DROP CONSTRAINT "FK_5a50773b5267d26d55cf8586c9b"`);
        await queryRunner.query(`ALTER TABLE "users_location_locations" DROP CONSTRAINT "FK_5783e1a0c3538f04301ef43b637"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5a50773b5267d26d55cf8586c9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5783e1a0c3538f04301ef43b63"`);
        await queryRunner.query(`DROP TABLE "users_location_locations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "locations"`);
    }

}
