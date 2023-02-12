"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ormconfig_1 = require("./config/ormconfig");
const index_1 = __importDefault(require("./controller/index"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_json_1 = __importDefault(require("./docs.json"));
const cors_1 = __importDefault(require("cors"));
const main = async () => {
    const app = (0, express_1.default)();
    try {
        await ormconfig_1.AppDataSource.initialize();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use(index_1.default);
        app.use(errorHandler_1.default);
        app.use("/api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_json_1.default));
        app.all("/*", (req, res) => res.status(404).json({
            messsage: "Page not found",
            status: 404,
        }));
    }
    catch (err) {
        console.log("Server Error");
    }
    finally {
        app.listen(9090, () => {
            console.log(9090);
        });
    }
};
main();
