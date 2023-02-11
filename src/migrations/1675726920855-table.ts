import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675726920855 implements MigrationInterface {
    name = 'table1675726920855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reyting" ALTER COLUMN "reyting" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reyting" ALTER COLUMN "all_count" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reyting" ALTER COLUMN "person_count" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "chegirma"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "chegirma" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "chegirma"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "chegirma" character varying`);
        await queryRunner.query(`ALTER TABLE "reyting" ALTER COLUMN "person_count" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "reyting" ALTER COLUMN "all_count" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "reyting" ALTER COLUMN "reyting" DROP DEFAULT`);
    }

}
