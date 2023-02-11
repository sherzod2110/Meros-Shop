"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reyting_entity_1 = require("./../../entities/reyting.entity");
const exeption_1 = require("../../exeption/exeption");
const ormconfig_1 = require("../../config/ormconfig");
exports.default = {
    GET_SORT_REYTING: async (req, res, next) => {
        const grade = await ormconfig_1.AppDataSource
            .getRepository(reyting_entity_1.Reyting)
            .find({
            order: {
                reyting: "ASC",
            },
        })
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        res.status(200).json({
            status: 200,
            data: grade,
        });
    },
};
