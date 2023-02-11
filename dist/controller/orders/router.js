"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = __importDefault(require("./orders"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const validate_2 = require("./validate");
const router = (0, express_1.Router)();
exports.default = router
    .get("/get", orders_1.default.GET)
    .post("/create", (0, validate_1.default)(validate_2.OrderValidate), orders_1.default.POST)
    .put("/update/:id", (0, validate_1.default)(validate_2.OrderUpdate), orders_1.default.PUT)
    .delete("/delete/:id", orders_1.default.DELETE);
