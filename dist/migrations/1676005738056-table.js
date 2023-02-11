"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1676005738056 = void 0;
class table1676005738056 {
    name = 'table1676005738056';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "sold_out" TO "sotildi"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "sotildi" TO "sold_out"`);
    }
}
exports.table1676005738056 = table1676005738056;
