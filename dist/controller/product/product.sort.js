"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_entity_1 = require("./../../entities/product.entity");
const ormconfig_1 = require("../../config/ormconfig");
exports.default = {
    GET_REYTING_SORT: async (req, res, next) => {
        const productRateSort = await ormconfig_1.AppDataSource.getRepository(product_entity_1.ProductEntity).find({
            relations: {
                reyting: true,
                comment: {
                    user: true,
                },
            },
            order: {
                reyting: {
                    reyting: "ASC",
                },
            },
        });
        res.status(200).json({
            status: 200,
            data: productRateSort,
        });
    },
    GET_SALES_SORT: async (req, res, next) => {
        const productRateSort = await ormconfig_1.AppDataSource.getRepository(product_entity_1.ProductEntity).find({
            relations: {
                reyting: true,
                comment: {
                    user: true,
                },
            },
            order: {
                price: "ASC",
            },
        });
        res.status(200).json({
            status: 200,
            data: productRateSort,
        });
    },
    GET_CHEGIRMA_SORT: async (req, res, next) => {
        const productRateSort = await ormconfig_1.AppDataSource.getRepository(product_entity_1.ProductEntity).find({
            relations: {
                reyting: true,
                comment: {
                    user: true,
                },
            },
            order: {
                chegirma: "ASC",
            },
        });
        res.status(200).json({
            status: 200,
            data: productRateSort,
        });
    },
};
