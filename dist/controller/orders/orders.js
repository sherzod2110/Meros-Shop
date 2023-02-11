"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_entity_1 = require("./../../entities/product.entity");
const jwt_1 = require("./../../utils/jwt");
const orders_entity_1 = require("./../../entities/orders.entity");
const exeption_1 = require("./../../exeption/exeption");
const ormconfig_1 = require("../../config/ormconfig");
const redis_1 = __importDefault(require("../../config/redis"));
exports.default = {
    GET: async (req, res, next) => {
        const client = await (0, redis_1.default)();
        const cashOrder = await client?.get("order");
        if (!cashOrder) {
            const order = await ormconfig_1.AppDataSource
                .getRepository(orders_entity_1.OrdersEntity)
                .find({
                relations: {
                    product: true,
                },
            })
                .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
            await client?.setEx("order", 15, JSON.stringify(order));
            res.status(200).json({
                status: 200,
                data: order,
            });
            return;
        }
        res.status(200).json({
            status: 200,
            data: JSON.parse(cashOrder),
        });
    },
    POST: async (req, res, next) => {
        try {
            const { count, productId } = req.filtered;
            const { token } = req.headers;
            const { id } = (0, jwt_1.verify)(token);
            const founderProduct = await ormconfig_1.AppDataSource.getRepository(product_entity_1.ProductEntity).findOne({
                where: {
                    id: productId,
                },
            });
            const founderOrder = await ormconfig_1.AppDataSource.getRepository(orders_entity_1.OrdersEntity).findOne({
                where: {
                    product: { id: productId },
                    user: { id: id },
                },
            });
            if (!founderOrder) {
                const newCount = (founderProduct?.sotildi + count);
                await ormconfig_1.AppDataSource
                    .getRepository(orders_entity_1.OrdersEntity)
                    .createQueryBuilder()
                    .insert()
                    .into(orders_entity_1.OrdersEntity)
                    .values({ count, product: productId, user: id })
                    .execute();
                await ormconfig_1.AppDataSource
                    .getRepository(product_entity_1.ProductEntity)
                    .createQueryBuilder()
                    .update(product_entity_1.ProductEntity)
                    .set({ sotildi: newCount })
                    .where({ id: productId })
                    .execute();
                res.status(201).json({
                    message: "Created",
                    status: 201,
                });
            }
            if (founderOrder) {
                const newCount = founderOrder?.count + count;
                const soldProduct = founderProduct?.sotildi + count;
                await ormconfig_1.AppDataSource
                    .getRepository(orders_entity_1.OrdersEntity)
                    .createQueryBuilder()
                    .update(orders_entity_1.OrdersEntity)
                    .set({ count: newCount })
                    .where({ id: productId })
                    .execute()
                    .catch((err) => next(new exeption_1.Exeption(err.message, 200)));
                res.status(201).json({
                    message: "success",
                    status: 201,
                });
                await ormconfig_1.AppDataSource
                    .getRepository(product_entity_1.ProductEntity)
                    .createQueryBuilder()
                    .update(product_entity_1.ProductEntity)
                    .set({ sotildi: soldProduct })
                    .where({ id: productId })
                    .execute()
                    .catch((err) => next(new exeption_1.Exeption(err.message, 200)));
                res.status(201).json({
                    status: 201,
                    data: "Order has been created",
                });
            }
        }
        catch (error) {
            next((error) => new exeption_1.Exeption(error.message, 500));
        }
    },
    PUT: async (req, res, next) => {
        const { id } = req.params;
        const { count, productId } = req.filtered;
        await ormconfig_1.AppDataSource
            .getRepository(orders_entity_1.OrdersEntity)
            .createQueryBuilder()
            .update(orders_entity_1.OrdersEntity)
            .set({ count, product: productId })
            .where({ id })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        res.status(200).json({
            message: "Order has been updated",
            status: 200,
        });
    },
    DELETE: async (req, res, next) => {
        const { id } = req.params;
        await ormconfig_1.AppDataSource
            .createQueryBuilder()
            .delete()
            .from(orders_entity_1.OrdersEntity)
            .where({ id })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        res.status(200).json({
            message: "Order has been deletd",
            status: 200,
        });
    },
};
