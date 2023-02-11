"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdate = exports.productValidate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.productValidate = joi_1.default.object({
    title: joi_1.default.string().max(30),
    price: joi_1.default.number(),
    chegirma: joi_1.default.number().min(2).max(100),
    comments: joi_1.default.string(),
    rate: joi_1.default.number(),
    brand: joi_1.default.string(),
    size: joi_1.default.string(),
    netto: joi_1.default.string(),
    author: joi_1.default.string(),
    discription: joi_1.default.string(),
    color: joi_1.default.string(),
    madeIn: joi_1.default.string(),
    img: joi_1.default.string(),
    img1: joi_1.default.string(),
    img2: joi_1.default.string(),
    img3: joi_1.default.string(),
    img4: joi_1.default.string(),
    dublSubId: joi_1.default.string(),
});
exports.productUpdate = joi_1.default.object({
    title: joi_1.default.string(),
    price: joi_1.default.number(),
    comments: joi_1.default.string(),
    rate: joi_1.default.number(),
    brand: joi_1.default.string(),
    size: joi_1.default.string(),
    netto: joi_1.default.string(),
    author: joi_1.default.string(),
    discription: joi_1.default.string(),
    color: joi_1.default.string(),
    madeIn: joi_1.default.string(),
    img: joi_1.default.string(),
    img1: joi_1.default.string(),
    img2: joi_1.default.string(),
    img3: joi_1.default.string(),
    img4: joi_1.default.string(),
    chegirma: joi_1.default.number().min(2).max(100),
    dublSubId: joi_1.default.string(),
});
