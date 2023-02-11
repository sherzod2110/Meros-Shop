"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exeption_1 = require("./../../exeption/exeption");
const product_entity_1 = require("../../entities/product.entity");
const ormconfig_1 = require("../../config/ormconfig");
// BIRINCHI PRODUCT CREATE QILADI KEYIN CHIGIRMA QIMAOQCHI BUSA ADMIN SHU YERDAN UPDATE QILIB CHEGIRMA COLUMN GA YOZIB QUYADI
exports.default = {
    PUT_CHEGIRMA: async (req, res, next) => {
        const { id } = req.params;
        const { chegirma } = req.filtered;
        const founder = (await ormconfig_1.AppDataSource.getRepository(product_entity_1.ProductEntity).findOne({
            where: {
                id,
            },
        }));
        const newPrice = founder?.price - (founder?.price * chegirma) / 100;
        await ormconfig_1.AppDataSource
            .createQueryBuilder()
            .update(product_entity_1.ProductEntity)
            .set({
            chegirma,
            new_price: newPrice,
        })
            .where("id = :id", { id })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, err.status)));
        res.status(200).json({
            message: "Chegirma has been update",
            status: 200,
        });
    },
};
