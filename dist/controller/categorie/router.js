"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = __importDefault(require("./category"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const validate_2 = require("./validate");
const router = (0, express_1.Router)();
exports.default = router
    .get("/get", category_1.default.GET)
    .post("/create", (0, validate_1.default)(validate_2.categoryCreate), category_1.default.POST)
    .put("/update/:id", (0, validate_1.default)(validate_2.categoryUpdate), category_1.default.PUT)
    .delete("/delete/:id", category_1.default.DELETE);
