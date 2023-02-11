"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exeption_1 = require("./../../exeption/exeption");
const product_entity_1 = require("../../entities/product.entity");
const ormconfig_1 = require("../../config/ormconfig");
const redis_1 = __importDefault(require("../../config/redis"));
exports.default = {
    GET: async (req, res, next) => {
        const client = await (0, redis_1.default)();
        const cashProducts = await client?.get("allProducts");
        if (!cashProducts) {
            const products = await ormconfig_1.AppDataSource.getRepository(product_entity_1.ProductEntity).find({
                relations: {
                    reyting: true,
                    comment: {
                        user: true,
                    },
                },
                select: {
                    comment: {
                        id: true,
                        title: true,
                        user: {
                            id: true,
                            username: true,
                            img: true,
                        },
                    },
                },
            });
            await client?.setEx("allProducts", 15, JSON.stringify(products));
            return res.status(200).json({
                status: 200,
                data: products,
            });
        }
        res.status(200).json({
            status: 200,
            data: JSON.parse(cashProducts),
        });
    },
    GET_PAGENATION: async (req, res, next) => {
        try {
            const { limit, page } = req.query;
            const lim = Number(limit);
            const pag = Number(page);
            const client = await (0, redis_1.default)();
            const cashProducts = (await client?.get("allProduct"));
            if (!cashProducts) {
                const products = await ormconfig_1.AppDataSource.getRepository(product_entity_1.ProductEntity).find({
                    relations: {
                        reyting: true,
                        comment: {
                            user: true,
                        },
                    },
                    select: {
                        comment: {
                            id: true,
                            title: true,
                            user: {
                                id: true,
                                username: true,
                                img: true,
                            },
                        },
                    },
                });
                const LimitOffset = products.slice((pag - 1) * lim, lim * pag);
                await client?.setEx("allProduct", 15, JSON.stringify(products));
                return res.status(200).json({
                    status: 200,
                    data: LimitOffset,
                });
            }
            const data = JSON.parse(cashProducts);
            const LimitOffset = data.slice((pag - 1) * lim, lim * pag);
            res.status(200).json({
                status: 200,
                data: LimitOffset,
            });
        }
        catch (error) {
            next(new exeption_1.Exeption(error.message, 500));
        }
    },
    GET_ID: async (req, res, next) => {
        const { id } = req.params;
        const founderUser = await ormconfig_1.AppDataSource
            .getRepository(product_entity_1.ProductEntity)
            .find({
            where: { id },
            relations: {
                comment: {
                    user: true,
                },
                reyting: true,
            },
            select: {
                comment: {
                    id: true,
                    title: true,
                    user: {
                        id: true,
                        username: true,
                        img: true,
                    },
                },
            },
        })
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        res.status(200).json({
            status: 200,
            data: founderUser,
        });
    },
    POST: async (req, res, next) => {
        const { title, price, comments, brand, size, author, sotildi, discription, color, madeIn, img, img1, dublSubId } = req.filtered;
        const allProducts = await ormconfig_1.AppDataSource.getRepository(product_entity_1.ProductEntity).findOne({
            where: {
                title,
                price,
                comments,
                brand,
                size,
                author,
                discription,
                color,
                sotildi,
                madeIn,
                img,
                img1,
                dublSubId,
            },
        });
        if (allProducts) {
            res.status(401).json({
                message: "Bunday Product mavjud",
            });
            return;
        }
        await ormconfig_1.AppDataSource
            .getRepository(product_entity_1.ProductEntity)
            .createQueryBuilder("product")
            .insert()
            .into(product_entity_1.ProductEntity)
            .values({
            title,
            price,
            comments,
            brand,
            size,
            author,
            discription,
            sotildi,
            color,
            madeIn,
            img,
            img1,
            dublSubId,
        })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        res.status(200).json({
            message: "Product has been created",
            status: 200,
        });
    },
    PUT: async (req, res, next) => {
        const { id } = req.params;
        const { title, price, comments, brand, size, author, discription, sotildi, color, madeIn, img, img1, dublSubId, chegirma } = req.filtered;
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
            title,
            price,
            new_price: newPrice,
            comments,
            brand,
            size,
            author,
            discription,
            color,
            sotildi,
            madeIn,
            img,
            img1,
            chegirma,
            dublSubId,
        })
            .where("id = :id", { id })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, err.status)));
        res.status(200).json({
            message: "Product has been created update",
            status: 200,
        });
    },
    DELETE: async (req, res, next) => {
        const { id } = req.params;
        await ormconfig_1.AppDataSource
            .createQueryBuilder()
            .delete()
            .from(product_entity_1.ProductEntity)
            .where("id = :id", { id })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        res.status(200).json({
            message: "Product has been deleted",
            status: 200,
        });
    },
};
