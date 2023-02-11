"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router_1 = __importDefault(require("./User.register/router"));
const router_2 = __importDefault(require("./categorie/router"));
const router_3 = __importDefault(require("./subCategory/router"));
const router_4 = __importDefault(require("./dublSubCategory/router"));
const router_5 = __importDefault(require("./product/router"));
const router_6 = __importDefault(require("./comments/router"));
const router_7 = __importDefault(require("./reyting/router"));
const router_8 = __importDefault(require("./orders/router"));
const router = (0, express_1.Router)();
exports.default = router
    .use("/user", router_1.default)
    .use("/category", router_2.default)
    .use("/subCategory", router_3.default)
    .use("/dublSubCategory", router_4.default)
    .use("/product", router_5.default)
    .use("/comments", router_6.default)
    .use("/reyting", router_7.default)
    .use("/order", router_8.default);
