"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dublSubCategory_entity_1 = require("./../../entities/dublSubCategory.entity");
const exeption_1 = require("./../../exeption/exeption");
const ormconfig_1 = require("../../config/ormconfig");
const redis_1 = __importDefault(require("../../config/redis"));
exports.default = {
    GET: async (req, res, next) => {
        const client = await (0, redis_1.default)();
        const cashDublCategory = await client?.get("dublCategory");
        if (!cashDublCategory) {
            const dublCategory = await ormconfig_1.AppDataSource
                .getRepository(dublSubCategory_entity_1.DublSubCategoryEntity)
                .find({
                relations: {
                    product: true,
                },
            })
                .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
            await client?.setEx("dublCategory", 15, JSON.stringify(dublCategory));
            res.status(200).json({
                status: 200,
                data: dublCategory,
            });
            return;
        }
        res.status(200).json({
            status: 200,
            data: JSON.parse(cashDublCategory),
        });
    },
    POST: async (req, res, next) => {
        const { title, subCatId } = req.filtered;
        const allSubCategory = await ormconfig_1.AppDataSource.getRepository(dublSubCategory_entity_1.DublSubCategoryEntity).findOne({
            where: {
                title,
                subCatId,
            },
        });
        if (allSubCategory) {
            res.status(401).json({
                message: "Bunday SubCategory mavjud",
            });
            return;
        }
        await ormconfig_1.AppDataSource
            .getRepository(dublSubCategory_entity_1.DublSubCategoryEntity)
            .createQueryBuilder("subcategory")
            .insert()
            .into(dublSubCategory_entity_1.DublSubCategoryEntity)
            .values({ title, subCatId })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        res.status(201).json({
            status: 201,
            message: "Dubl Sub Category has been created",
        });
    },
    PUT: async (req, res, next) => {
        const { id } = req.params;
        const { title } = req.filtered;
        await ormconfig_1.AppDataSource
            .createQueryBuilder()
            .update(dublSubCategory_entity_1.DublSubCategoryEntity)
            .set({ title })
            .where("id = :id", { id })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        res.status(200).json({
            message: "Dubl Sub Category has been update",
            status: 200,
        });
    },
    DELETE: async (req, res, next) => {
        const { id } = req.params;
        await ormconfig_1.AppDataSource
            .createQueryBuilder()
            .delete()
            .from(dublSubCategory_entity_1.DublSubCategoryEntity)
            .where("id = :id", { id })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        res.status(200).json({
            message: "Dubl Sub Category has been Delete",
            status: 200,
        });
    },
};
