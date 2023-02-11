"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryUpdate = exports.subCategoryCreate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.subCategoryCreate = joi_1.default.object({
    title: joi_1.default.string().max(65).required(),
    categoriesId: joi_1.default.string().max(65).required(),
});
exports.subCategoryUpdate = joi_1.default.object({
    title: joi_1.default.string().max(65),
});
