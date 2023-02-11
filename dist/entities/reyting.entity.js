"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reyting = void 0;
const product_entity_1 = require("./product.entity");
const typeorm_1 = require("typeorm");
let Reyting = class Reyting {
    id;
    reyting;
    all_count;
    person_count;
    product;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Reyting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], Reyting.prototype, "reyting", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], Reyting.prototype, "all_count", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], Reyting.prototype, "person_count", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.reyting, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", product_entity_1.ProductEntity)
], Reyting.prototype, "product", void 0);
Reyting = __decorate([
    (0, typeorm_1.Entity)({
        name: "reyting",
    })
], Reyting);
exports.Reyting = Reyting;
