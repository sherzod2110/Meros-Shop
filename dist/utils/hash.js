"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashpassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashpassword = (password) => {
    const HASH = bcrypt_1.default.genSaltSync();
    return bcrypt_1.default.hashSync(password, HASH);
};
exports.hashpassword = hashpassword;
