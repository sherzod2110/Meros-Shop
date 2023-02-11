"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exeption = void 0;
class Exeption extends Error {
    message;
    status;
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}
exports.Exeption = Exeption;
