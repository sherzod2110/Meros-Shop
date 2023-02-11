"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exeption_1 = require("./../../exeption/exeption");
const category_entity_1 = require("./../../entities/category.entity");
const ormconfig_1 = require("../../config/ormconfig");
const redis_1 = __importDefault(require("../../config/redis"));
exports.default = {
    GET: async (req, res, next) => {
        const client = await (0, redis_1.default)();
        const cashCategory = await client?.get("allCategory");
        if (!cashCategory) {
            const category = await ormconfig_1.AppDataSource
                .getRepository(category_entity_1.CategoryEntity)
                .find({
                relations: {
                    subCategories: true,
                },
            })
                .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
            await client?.setEx("allCategory", 15, JSON.stringify(category));
            res.status(200).json({
                status: 200,
                data: category,
            });
            return;
        }
        res.status(200).json({
            status: 200,
            data: JSON.parse(cashCategory),
        });
    },
    POST: async (req, res, next) => {
        const { title } = req.filtered;
        const allCategory = await ormconfig_1.AppDataSource.getRepository(category_entity_1.CategoryEntity).findOne({
            where: {
                title,
            },
        });
        if (allCategory) {
            res.status(401).json({
                message: "Bunday Category mavjud",
            });
            return;
        }
        await ormconfig_1.AppDataSource
            .getRepository(category_entity_1.CategoryEntity)
            .createQueryBuilder("category")
            .insert()
            .into(category_entity_1.CategoryEntity)
            .values({ title })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 501)));
        res.status(200).json({
            message: "Category has been created",
            status: 200,
        });
    },
    PUT: async (req, res, next) => {
        const { id } = req.params;
        const { title } = req.filtered;
        await ormconfig_1.AppDataSource
            .createQueryBuilder()
            .update(category_entity_1.CategoryEntity)
            .set({ title })
            .where("id = :id", { id })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, err.status)));
        res.status(200).json({
            message: "Category has been updated",
            status: 200,
        });
    },
    DELETE: async (req, res, next) => {
        const { id } = req.params;
        await ormconfig_1.AppDataSource
            .createQueryBuilder()
            .delete()
            .from(category_entity_1.CategoryEntity)
            .where({ id })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 501)));
        res.status(200).json({
            message: "Category has been deleted",
            status: 200,
        });
    },
};
