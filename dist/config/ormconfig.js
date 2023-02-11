"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "otto.db.elephantsql.com",
    password: "Bwm1gSfynF0hU8_DrSpilXfcdq_t_bjf",
    port: 5432,
    username: "rsqhaibe",
    database: "rsqhaibe",
    entities: [path_1.default.resolve(__dirname, "..", "entities", "*.entity.{ts,js}")],
    migrations: [path_1.default.resolve(__dirname, "..", "migrations", "**/*.{ts,js}")],
    logging: true,
    synchronize: false,
});
exports.AppDataSource = AppDataSource;
// postgres://rsqhaibe:Bwm1gSfynF0hU8_DrSpilXfcdq_t_bjf@otto.db.elephantsql.com/rsqhaibe
