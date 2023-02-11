"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = async () => {
    try {
        const client = (0, redis_1.createClient)({
            url: "redis://127.0.0.1:6379",
        });
        client.on("error", () => console.log("Error"));
        await client?.connect();
        return client;
    }
    catch (err) {
        console.log(err);
    }
};
