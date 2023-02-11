import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675710706037 implements MigrationInterface {
    name = 'table1675710706037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reyting" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reyting" numeric, "all_count" integer, "person_count" integer, "productId" uuid, CONSTRAINT "PK_7736037e241bbc4962825581c34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reyting" ADD CONSTRAINT "FK_04d2d0d17763675b03b6042fbc7" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reyting" DROP CONSTRAINT "FK_04d2d0d17763675b03b6042fbc7"`);
        await queryRunner.query(`DROP TABLE "reyting"`);
    }

}
