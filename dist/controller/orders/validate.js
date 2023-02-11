"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderUpdate = exports.OrderValidate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.OrderValidate = joi_1.default.object({
    count: joi_1.default.number().required(),
    productId: joi_1.default.string().required(),
});
exports.OrderUpdate = joi_1.default.object({
    count: joi_1.default.number(),
    productId: joi_1.default.string().required(),
});
