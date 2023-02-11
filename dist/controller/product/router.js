"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("./product"));
const product_sort_1 = __importDefault(require("./product.sort"));
const chegirmaUpdate_1 = __importDefault(require("./chegirmaUpdate"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const validate_2 = require("./validate");
const router = (0, express_1.Router)();
exports.default = router
    .get("/get/all", product_1.default.GET)
    .get("/get/pagenation", product_1.default.GET_PAGENATION)
    .get("/get/one/:id", product_1.default.GET_ID)
    .get("/get/reyting/sort", product_sort_1.default.GET_REYTING_SORT)
    .get("/get/sales/sort", product_sort_1.default.GET_SALES_SORT)
    .get("/get/chegirma/sort", product_sort_1.default.GET_CHEGIRMA_SORT)
    .post("/create", (0, validate_1.default)(validate_2.productValidate), product_1.default.POST)
    .put("/update/:id", (0, validate_1.default)(validate_2.productUpdate), product_1.default.PUT)
    .put("/update/chegirma/:id", (0, validate_1.default)(validate_2.productUpdate), chegirmaUpdate_1.default.PUT_CHEGIRMA)
    .delete("/delete/:id", product_1.default.DELETE);
