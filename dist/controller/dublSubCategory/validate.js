"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dublSubCategoryUpdate = exports.dublSubCategoryCreate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.dublSubCategoryCreate = joi_1.default.object({
    title: joi_1.default.string().max(65).required(),
    subCatId: joi_1.default.string().required(),
});
exports.dublSubCategoryUpdate = joi_1.default.object({
    title: joi_1.default.string().max(65),
});
