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
exports.ProductEntity = void 0;
const orders_entity_1 = require("./orders.entity");
const reyting_entity_1 = require("./reyting.entity");
const comments_entity_1 = require("./comments.entity");
const dublSubCategory_entity_1 = require("./dublSubCategory.entity");
const typeorm_1 = require("typeorm");
let ProductEntity = class ProductEntity {
    id;
    title;
    price;
    new_price;
    chegirma;
    comments;
    brand;
    size;
    author;
    discription;
    color;
    madeIn;
    sotildi;
    img;
    img1;
    dublSubId;
    dublSub;
    reyting;
    comment;
    order;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ProductEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 30,
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        nullable: true,
    }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "new_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: Number,
        nullable: true,
    }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "chegirma", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "discription", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "madeIn", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "sotildi", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "img1", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid", {
        name: "dublSubId",
    }),
    __metadata("design:type", Object)
], ProductEntity.prototype, "dublSubId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dublSubCategory_entity_1.DublSubCategoryEntity, (subCategory) => subCategory.product, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", dublSubCategory_entity_1.DublSubCategoryEntity)
], ProductEntity.prototype, "dublSub", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reyting_entity_1.Reyting, (rate) => rate.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "reyting", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_entity_1.CommentsEntity, (comment) => comment.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.OrdersEntity, (order) => order.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "order", void 0);
ProductEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "product",
    })
], ProductEntity);
exports.ProductEntity = ProductEntity;
