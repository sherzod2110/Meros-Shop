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
exports.UsersEntity = void 0;
const orders_entity_1 = require("./orders.entity");
const comments_entity_1 = require("./comments.entity");
const typeorm_1 = require("typeorm");
let UsersEntity = class UsersEntity {
    id;
    username;
    password;
    phone;
    email;
    img;
    gender;
    comment;
    orders;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], UsersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: false,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: false,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: true,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: true,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_entity_1.CommentsEntity, (comment) => comment.user),
    __metadata("design:type", Array)
], UsersEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.OrdersEntity, (order) => order.user),
    __metadata("design:type", Array)
], UsersEntity.prototype, "orders", void 0);
UsersEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "users",
    })
], UsersEntity);
exports.UsersEntity = UsersEntity;
