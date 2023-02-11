"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exeption_1 = require("../exeption/exeption");
exports.default = (err, req, res, next) => {
    if (err instanceof exeption_1.Exeption) {
        res.status(err.status).json({
            message: err.message,
            status: err.status,
        });
        return;
    }
    res.status(500).json({
        message: "Internal Server Error",
        status: 500,
    });
};
