import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDealsTable1725746822792 implements MigrationInterface {
    name = 'CreateDealsTable1725746822792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."deals_type_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TYPE "public"."deals_urgency_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "deals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."deals_type_enum" NOT NULL, "value" numeric NOT NULL, "description" text NOT NULL, "trade_for" character varying(256), "lat" numeric(10,7) NOT NULL, "lng" numeric(10,7) NOT NULL, "address" character varying(255) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(100) NOT NULL, "zipcode" character varying(20) NOT NULL, "urgency" "public"."deals_urgency_enum" NOT NULL, "limit_date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_8c66f03b250f613ff8615940b4b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "deals" ADD CONSTRAINT "FK_2ab80c329115e938c396ed5d418" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" DROP CONSTRAINT "FK_2ab80c329115e938c396ed5d418"`);
        await queryRunner.query(`DROP TABLE "deals"`);
        await queryRunner.query(`DROP TYPE "public"."deals_urgency_enum"`);
        await queryRunner.query(`DROP TYPE "public"."deals_type_enum"`);
    }

}
