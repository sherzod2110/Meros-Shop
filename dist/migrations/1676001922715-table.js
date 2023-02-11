"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1676001922715 = void 0;
class table1676001922715 {
    name = 'table1676001922715';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_8624dad595ae567818ad9983b33"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "reyting" DROP CONSTRAINT "FK_04d2d0d17763675b03b6042fbc7"`);
        await queryRunner.query(`ALTER TABLE "subcategory" DROP CONSTRAINT "FK_f4da68f3b29fcf6d3e75854577e"`);
        await queryRunner.query(`ALTER TABLE "dublsubcategory" DROP CONSTRAINT "FK_49b9a3978bf2e0e1aa1d0ec2023"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_cd5f8796986069edd8fdf710631"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_8624dad595ae567818ad9983b33" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reyting" ADD CONSTRAINT "FK_04d2d0d17763675b03b6042fbc7" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcategory" ADD CONSTRAINT "FK_f4da68f3b29fcf6d3e75854577e" FOREIGN KEY ("categoriesId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dublsubcategory" ADD CONSTRAINT "FK_49b9a3978bf2e0e1aa1d0ec2023" FOREIGN KEY ("subCatId") REFERENCES "subcategory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_cd5f8796986069edd8fdf710631" FOREIGN KEY ("dublSubId") REFERENCES "dublsubcategory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_cd5f8796986069edd8fdf710631"`);
        await queryRunner.query(`ALTER TABLE "dublsubcategory" DROP CONSTRAINT "FK_49b9a3978bf2e0e1aa1d0ec2023"`);
        await queryRunner.query(`ALTER TABLE "subcategory" DROP CONSTRAINT "FK_f4da68f3b29fcf6d3e75854577e"`);
        await queryRunner.query(`ALTER TABLE "reyting" DROP CONSTRAINT "FK_04d2d0d17763675b03b6042fbc7"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_8624dad595ae567818ad9983b33"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_cd5f8796986069edd8fdf710631" FOREIGN KEY ("dublSubId") REFERENCES "dublsubcategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dublsubcategory" ADD CONSTRAINT "FK_49b9a3978bf2e0e1aa1d0ec2023" FOREIGN KEY ("subCatId") REFERENCES "subcategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcategory" ADD CONSTRAINT "FK_f4da68f3b29fcf6d3e75854577e" FOREIGN KEY ("categoriesId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reyting" ADD CONSTRAINT "FK_04d2d0d17763675b03b6042fbc7" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_8624dad595ae567818ad9983b33" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.table1676001922715 = table1676001922715;
