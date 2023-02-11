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
exports.SubCategoryEntity = void 0;
const dublSubCategory_entity_1 = require("./dublSubCategory.entity");
const category_entity_1 = require("./category.entity");
const typeorm_1 = require("typeorm");
let SubCategoryEntity = class SubCategoryEntity {
    id;
    title;
    categoriesId;
    categories;
    dublSub;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], SubCategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 30,
    }),
    __metadata("design:type", String)
], SubCategoryEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], SubCategoryEntity.prototype, "categoriesId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity, (category) => category.subCategories, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", category_entity_1.CategoryEntity)
], SubCategoryEntity.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dublSubCategory_entity_1.DublSubCategoryEntity, (dublSubCat) => dublSubCat.subCat),
    __metadata("design:type", Array)
], SubCategoryEntity.prototype, "dublSub", void 0);
SubCategoryEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "subcategory",
    })
], SubCategoryEntity);
exports.SubCategoryEntity = SubCategoryEntity;
