"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675710706037 = void 0;
class table1675710706037 {
    name = 'table1675710706037';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "reyting" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reyting" numeric, "all_count" integer, "person_count" integer, "productId" uuid, CONSTRAINT "PK_7736037e241bbc4962825581c34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reyting" ADD CONSTRAINT "FK_04d2d0d17763675b03b6042fbc7" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "reyting" DROP CONSTRAINT "FK_04d2d0d17763675b03b6042fbc7"`);
        await queryRunner.query(`DROP TABLE "reyting"`);
    }
}
exports.table1675710706037 = table1675710706037;
