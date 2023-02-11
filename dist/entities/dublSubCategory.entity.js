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
exports.DublSubCategoryEntity = void 0;
const product_entity_1 = require("./product.entity");
const subCategory_entity_1 = require("./subCategory.entity");
const typeorm_1 = require("typeorm");
let DublSubCategoryEntity = class DublSubCategoryEntity {
    id;
    title;
    subCatId;
    subCat;
    product;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], DublSubCategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 30,
    }),
    __metadata("design:type", String)
], DublSubCategoryEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", Object)
], DublSubCategoryEntity.prototype, "subCatId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subCategory_entity_1.SubCategoryEntity, (subCategory) => subCategory.dublSub, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", subCategory_entity_1.SubCategoryEntity)
], DublSubCategoryEntity.prototype, "subCat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.ProductEntity, (product) => product.dublSub),
    __metadata("design:type", Array)
], DublSubCategoryEntity.prototype, "product", void 0);
DublSubCategoryEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "dublsubcategory",
    })
], DublSubCategoryEntity);
exports.DublSubCategoryEntity = DublSubCategoryEntity;
