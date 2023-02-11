"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reyting_1 = __importDefault(require("./reyting"));
const reyting_sort_1 = __importDefault(require("./reyting.sort"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const validate_2 = require("./validate");
const router = (0, express_1.Router)();
exports.default = router
    .get("/get", reyting_1.default.GET)
    .get("/get/reyting/sort", reyting_sort_1.default.GET_SORT_REYTING)
    .post("/create", (0, validate_1.default)(validate_2.reytingValidate), reyting_1.default.POST);
