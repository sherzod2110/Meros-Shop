"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdate = exports.userCreateValidate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userCreateValidate = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    img: joi_1.default.string(),
    gender: joi_1.default.string(),
});
exports.userUpdate = joi_1.default.object({
    username: joi_1.default.string(),
    password: joi_1.default.string(),
    phone: joi_1.default.string(),
    email: joi_1.default.string(),
    img: joi_1.default.string(),
    gender: joi_1.default.string(),
});
