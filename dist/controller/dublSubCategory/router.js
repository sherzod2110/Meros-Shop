"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dublSubCategory_1 = __importDefault(require("./dublSubCategory"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const validate_2 = require("./validate");
const router = (0, express_1.Router)();
exports.default = router
    .get("/get", dublSubCategory_1.default.GET)
    .post("/create", (0, validate_1.default)(validate_2.dublSubCategoryCreate), dublSubCategory_1.default.POST)
    .put("/update/:id", (0, validate_1.default)(validate_2.dublSubCategoryUpdate), dublSubCategory_1.default.PUT)
    .delete("/delete/:id", dublSubCategory_1.default.DELETE);
