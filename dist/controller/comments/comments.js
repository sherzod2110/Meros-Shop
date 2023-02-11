"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comments_entity_1 = require("../../entities/comments.entity");
const exeption_1 = require("./../../exeption/exeption");
const ormconfig_1 = require("../../config/ormconfig");
const jwt_1 = require("../../utils/jwt");
const redis_1 = __importDefault(require("../../config/redis"));
exports.default = {
    GET: async (req, res, next) => {
        const client = await (0, redis_1.default)();
        const cashComment = await client?.get("allComments");
        if (!cashComment) {
            const comment = await ormconfig_1.AppDataSource
                .getRepository(comments_entity_1.CommentsEntity)
                .find({
                relations: {
                    user: true,
                },
                select: {
                    user: {
                        id: true,
                        username: true,
                        img: true,
                    },
                },
            })
                .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
            await client?.setEx("allComments", 15, JSON.stringify(comment));
            res.status(200).json({
                status: 200,
                data: comment,
            });
            return;
        }
        res.status(200).json({
            status: 200,
            data: JSON.parse(cashComment),
        });
    },
    POST: async (req, res, next) => {
        const { title, producId } = req.filtered;
        const { token } = req.headers;
        const user = (0, jwt_1.verify)(token);
        await ormconfig_1.AppDataSource
            .getRepository(comments_entity_1.CommentsEntity)
            .createQueryBuilder("dublsubcategory")
            .insert()
            .into(comments_entity_1.CommentsEntity)
            .values({ title, product: producId, user: user })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        res.status(201).json({
            message: "Comment has been created",
            status: 201,
        });
    },
    PUT: async (req, res, next) => {
        const { id } = req.params;
        const { title } = req.body;
        const updateComment = await ormconfig_1.AppDataSource
            .getRepository(comments_entity_1.CommentsEntity)
            .createQueryBuilder()
            .update()
            .set({ title })
            .where({ id })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        if (updateComment) {
            res.status(200).json({
                message: "Comment has been updated",
                status: 200,
            });
        }
    },
    DELETE: async (req, res, next) => {
        const { id } = req.params;
        const deleted = await ormconfig_1.AppDataSource
            .createQueryBuilder()
            .delete()
            .from(comments_entity_1.CommentsEntity)
            .where("id = :id", { id })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        if (deleted) {
            res.status(200).json({
                message: "Comment has been deleted",
                status: 200,
            });
        }
    },
};
