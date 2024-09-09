import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBidsTable1725845202421 implements MigrationInterface {
    name = 'CreateBidsTable1725845202421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bids" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accepted" boolean NOT NULL DEFAULT false, "value" numeric NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "dealId" uuid, CONSTRAINT "PK_7950d066d322aab3a488ac39fe5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bids" ADD CONSTRAINT "FK_1531393fadbf123f3d51c91d819" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bids" ADD CONSTRAINT "FK_1a6e971f4e395cf9db06480e07d" FOREIGN KEY ("dealId") REFERENCES "deals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bids" DROP CONSTRAINT "FK_1a6e971f4e395cf9db06480e07d"`);
        await queryRunner.query(`ALTER TABLE "bids" DROP CONSTRAINT "FK_1531393fadbf123f3d51c91d819"`);
        await queryRunner.query(`DROP TABLE "bids"`);
    }

}
