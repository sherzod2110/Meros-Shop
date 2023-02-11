"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reyting_entity_1 = require("./../../entities/reyting.entity");
const exeption_1 = require("../../exeption/exeption");
const ormconfig_1 = require("../../config/ormconfig");
const redis_1 = __importDefault(require("../../config/redis"));
exports.default = {
    GET: async (req, res, next) => {
        const client = await (0, redis_1.default)();
        const cashReyting = await client?.get("reyting");
        if (!cashReyting) {
            const grade = await ormconfig_1.AppDataSource.getRepository(reyting_entity_1.Reyting).find();
            await client?.setEx("reyting", 15, JSON.stringify(grade));
            res.status(200).json({
                status: 200,
                data: grade,
            });
            return;
        }
        res.status(200).json({
            status: 200,
            data: JSON.parse(cashReyting),
        });
    },
    POST: async (req, res, next) => {
        try {
            const { all_count, productId } = req.filtered;
            const foundProduct = await ormconfig_1.AppDataSource.getRepository(reyting_entity_1.Reyting).find({
                where: {
                    product: {
                        id: productId,
                    },
                },
            });
            if (!foundProduct.length) {
                await ormconfig_1.AppDataSource
                    .getRepository(reyting_entity_1.Reyting)
                    .createQueryBuilder()
                    .insert()
                    .into(reyting_entity_1.Reyting)
                    .values({ person_count: 1, reyting: all_count, all_count, product: productId })
                    .execute()
                    .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
                res.status(201).json({
                    status: 201,
                    message: "Success create",
                });
                return;
            }
            if (foundProduct.length) {
                const Count = foundProduct[0].person_count + 1;
                const AllCount = foundProduct[0].all_count + all_count;
                const id = foundProduct[0].id;
                const Reytin = AllCount / Count;
                await ormconfig_1.AppDataSource
                    .getRepository(reyting_entity_1.Reyting)
                    .createQueryBuilder()
                    .update()
                    .set({ product: productId, all_count: AllCount, reyting: Reytin, person_count: Count })
                    .where({ id })
                    .execute()
                    .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
                res.status(200).json({
                    message: "Success Update",
                    status: 200,
                });
            }
        }
        catch (error) {
            next(new exeption_1.Exeption(error.message, 500));
        }
    },
};
