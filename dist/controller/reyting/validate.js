"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reytingValidate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.reytingValidate = joi_1.default.object({
    all_count: joi_1.default.number().max(5),
    productId: joi_1.default.string().required(),
});
