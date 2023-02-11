"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const validate_2 = require("./validate");
const router = (0, express_1.Router)();
exports.default = router
    .get("/get", users_1.default.GET)
    .post("/create", (0, validate_1.default)(validate_2.userCreateValidate), users_1.default.POST)
    .post("/login", (0, validate_1.default)(validate_2.userCreateValidate), users_1.default.LOGIN)
    .put("/update", (0, validate_1.default)(validate_2.userUpdate), users_1.default.PUT)
    .delete("/delete", users_1.default.DELETE);
