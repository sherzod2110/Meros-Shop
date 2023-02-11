"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_entity_1 = require("./../../entities/users.entity");
const exeption_1 = require("./../../exeption/exeption");
const jwt_1 = require("../../utils/jwt");
const hash_1 = require("../../utils/hash");
const ormconfig_1 = require("../../config/ormconfig");
const redis_1 = __importDefault(require("../../config/redis"));
exports.default = {
    GET: async (req, res, next) => {
        try {
            const { token } = req.headers;
            const { id } = (0, jwt_1.verify)(token);
            const clint = await (0, redis_1.default)();
            const cashUsers = (await clint?.get("User"));
            if (!cashUsers) {
                const allUsers = (await ormconfig_1.AppDataSource.getRepository(users_entity_1.UsersEntity).findOne({
                    where: {
                        id,
                    },
                    relations: {
                        orders: {
                            product: true,
                        },
                    },
                    select: {
                        orders: {
                            id: true,
                            count: true,
                            product: {
                                id: true,
                                title: true,
                                price: true,
                                chegirma: true,
                                new_price: true,
                                author: true,
                                brand: true,
                                color: true,
                                size: true,
                                sotildi: true,
                                discription: true,
                                madeIn: true,
                                img: true,
                                img1: true,
                            },
                        },
                    },
                }));
                await clint?.setEx("User", 15, JSON.stringify(allUsers));
                res.status(200).json({
                    status: 200,
                    data: allUsers,
                });
            }
            const UserParse = JSON.parse(cashUsers);
            res.status(200).json({
                status: 200,
                data: UserParse,
            });
        }
        catch (err) {
            next(new exeption_1.Exeption(err.message, 500));
        }
    },
    POST: async (req, res, next) => {
        const { username, password, phone, email, img, gender } = req.filtered;
        const passwordHash = (0, hash_1.hashpassword)(password);
        const existingUser = await ormconfig_1.AppDataSource.getRepository(users_entity_1.UsersEntity).findOne({
            where: {
                username,
                phone,
                email,
                img,
            },
        });
        if (existingUser) {
            res.status(401).json({
                message: "Bunday User Bor",
                status: 401,
            });
            return;
        }
        const newUser = await ormconfig_1.AppDataSource
            .getRepository(users_entity_1.UsersEntity)
            .createQueryBuilder()
            .insert()
            .into(users_entity_1.UsersEntity)
            .values({ username, password: passwordHash, phone, email, img, gender })
            .returning(["id"])
            .execute();
        res.status(201).json({
            message: "User has been created",
            token: (0, jwt_1.sign)({ id: newUser.raw[0].id }),
        });
    },
    LOGIN: async (req, res, next) => {
        const { email, username } = req.filtered;
        const user = await ormconfig_1.AppDataSource.getRepository(users_entity_1.UsersEntity).findOne({
            where: {
                username,
                email,
            },
        });
        if (user) {
            res.status(201).json({
                token: (0, jwt_1.sign)({ id: user.id }),
            });
            return;
        }
        res.status(404).json({
            data: "User not found",
            status: 404,
        });
    },
    PUT: async (req, res, next) => {
        const { token } = req.headers;
        const { id } = (0, jwt_1.verify)(token);
        const { username, password, phone, email, img, gender } = req.filtered;
        const foundUser = await ormconfig_1.AppDataSource.getRepository(users_entity_1.UsersEntity).findOne({
            where: {
                id,
            },
        });
        let hashPassword;
        if (password) {
            hashPassword = (0, hash_1.hashpassword)(password);
        }
        const updateUser = await ormconfig_1.AppDataSource
            .getRepository(users_entity_1.UsersEntity)
            .createQueryBuilder()
            .update(users_entity_1.UsersEntity)
            .set({
            username,
            password: hashPassword,
            phone,
            email,
            img,
            gender,
        })
            .where({ id })
            .execute()
            .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
        if (updateUser) {
            res.status(200).json({
                message: "User has been updated",
                status: 200,
            });
        }
    },
    DELETE: async (req, res, next) => {
        const { token } = req.headers;
        const { id } = (0, jwt_1.verify)(token);
        const foundUser = await ormconfig_1.AppDataSource.getRepository(users_entity_1.UsersEntity).findOne({
            where: {
                id,
            },
        });
        if (foundUser) {
            await ormconfig_1.AppDataSource
                .createQueryBuilder()
                .delete()
                .from(users_entity_1.UsersEntity)
                .where({ id })
                .execute()
                .catch((err) => next(new exeption_1.Exeption(err.message, 500)));
            res.status(202).json({
                message: "User has been deleted",
                status: 202,
            });
            return;
        }
        res.status(404).json({
            message: "User not found",
            status: 404,
        });
    },
};
