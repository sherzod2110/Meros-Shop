"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exeption_1 = require("./../../exeption/exeption");
const subCategory_entity_1 = require("../../entities/subCategory.entity");
const ormconfig_1 = require("../../config/ormconfig");
const redis_1 = __importDefault(require("../../config/redis"));
exports.default = {
    GET: async (req, res, next) => {
        const client = await (0, redis_1.default)();
        const cashSubCategort = await client?.get("subCategory");
        if (!cashSubCategort) {
            const subCategory = await ormconfig_1.AppDataSource
                .getRepository(subCategory_entity_1.SubCategoryEntity)
                .find({
                relations: {
                    dublSub: true,
                },
            })
                .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
            await client?.setEx("subCategory", 15, JSON.stringify(subCategory));
            res.status(200).json({
                status: 200,
                data: subCategory,
            });
            return;
        }
        res.status(200).json({
            status: 200,
            data: JSON.parse(cashSubCategort),
        });
    },
    POST: async (req, res, next) => {
        const { title, categoriesId } = req.filtered;
        const allSubCategory = await ormconfig_1.AppDataSource.getRepository(subCategory_entity_1.SubCategoryEntity).findOne({
            where: {
                title,
                categoriesId,
            },
        });
        if (allSubCategory) {
            res.status(401).json({
                message: "Bunday SubCategory mavjud",
            });
            return;
        }
        await ormconfig_1.AppDataSource
            .getRepository(subCategory_entity_1.SubCategoryEntity)
            .createQueryBuilder("subcategory")
            .insert()
            .into(subCategory_entity_1.SubCategoryEntity)
            .values({ title, categoriesId })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        res.status(200).json({
            message: "Sub Category has been created",
            status: 200,
        });
    },
    PUT: async (req, res, next) => {
        const { id } = req.params;
        const { title } = req.filtered;
        if (typeof title === "string") {
            await ormconfig_1.AppDataSource
                .createQueryBuilder()
                .update(subCategory_entity_1.SubCategoryEntity)
                .set({ title })
                .where("id = :id", { id })
                .execute()
                .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
            res.status(200).json({
                message: "Sub Category has been update",
                status: 200,
            });
        }
    },
    DELETE: async (req, res, next) => {
        const { id } = req.params;
        await ormconfig_1.AppDataSource
            .createQueryBuilder()
            .delete()
            .from(subCategory_entity_1.SubCategoryEntity)
            .where("id = :id", { id })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        res.status(200).json({
            message: "Sub Category has been Delete",
            status: 200,
        });
    },
};
