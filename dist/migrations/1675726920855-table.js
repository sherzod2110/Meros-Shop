"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675726920855 = void 0;
class table1675726920855 {
    name = 'table1675726920855';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "reyting" ALTER COLUMN "reyting" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reyting" ALTER COLUMN "all_count" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reyting" ALTER COLUMN "person_count" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "chegirma"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "chegirma" integer`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "chegirma"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "chegirma" character varying`);
        await queryRunner.query(`ALTER TABLE "reyting" ALTER COLUMN "person_count" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "reyting" ALTER COLUMN "all_count" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "reyting" ALTER COLUMN "reyting" DROP DEFAULT`);
    }
}
exports.table1675726920855 = table1675726920855;
