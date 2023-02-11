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
exports.CategoryEntity = void 0;
const subCategory_entity_1 = require("./subCategory.entity");
const typeorm_1 = require("typeorm");
let CategoryEntity = class CategoryEntity {
    id;
    title;
    subCategories;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], CategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 30,
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subCategory_entity_1.SubCategoryEntity, (subCat) => subCat.categories),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "subCategories", void 0);
CategoryEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "category",
    })
], CategoryEntity);
exports.CategoryEntity = CategoryEntity;
