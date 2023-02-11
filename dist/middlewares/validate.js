"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exeption_1 = require("../exeption/exeption");
exports.default = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            return next(new exeption_1.Exeption(error.message, 422));
        }
        req.filtered = value;
        next();
    };
};
