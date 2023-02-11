import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676005738056 implements MigrationInterface {
    name = 'table1676005738056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "sold_out" TO "sotildi"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "sotildi" TO "sold_out"`);
    }

}
