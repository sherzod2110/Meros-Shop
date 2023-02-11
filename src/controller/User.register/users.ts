import { UsersEntity } from "./../../entities/users.entity"
import { Exeption } from "./../../exeption/exeption"
import { Request, Response, NextFunction } from "express"
import { sign, verify } from "../../utils/jwt"
import { hashpassword } from "../../utils/hash"
import { AppDataSource as dataSource } from "../../config/ormconfig"
import redis from "../../config/redis"
import { InsertResult, UpdateResult } from "typeorm"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { token } = req.headers as any
      const { id } = verify(token) as any
 
      const clint = await redis()
      const cashUsers = (await clint?.get("User")) as any

      if (!cashUsers) {
        const allUsers: UsersEntity[] = (await dataSource.getRepository(UsersEntity).findOne({
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
        })) as any

        await clint?.setEx("User", 15, JSON.stringify(allUsers))

        res.status(200).json({
          status: <number>200,
          data: allUsers,
        })
      }

      const UserParse = JSON.parse(cashUsers)

      res.status(200).json({
        status: <number>200,
        data: UserParse,
      })
    } catch (err: any) {
      next(new Exeption(err.message, 500))
    }
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password, phone, email, img, gender } = req.filtered
    const passwordHash: string = hashpassword(password)

    const existingUser: UsersEntity | null = await dataSource.getRepository(UsersEntity).findOne({
      where: {
        username,
        phone,
        email,
        img,
      },
    })

    if (existingUser) {
      res.status(401).json({
        message: <string>"Bunday User Bor",
        status: <number>401,
      })
      return
    }

    const newUser: InsertResult = await dataSource
      .getRepository(UsersEntity)
      .createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values({ username, password: passwordHash, phone, email, img, gender })
      .returning(["id"])
      .execute()

    res.status(201).json({
      message: "User has been created",
      token: sign({ id: newUser.raw[0].id }),
    })
  },
  LOGIN: async (req: Request, res: Response, next: NextFunction) => {
    const { email, username } = req.filtered

    const user = await dataSource.getRepository(UsersEntity).findOne({
      where: {
        username,
        email,
      },
    })

    if (user) {
      res.status(201).json({
        token: sign({ id: user.id }),
      })
      return
    }
    res.status(404).json({
      data: "User not found",
      status: 404,
    })
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { token } = req.headers as any
    const { id } = verify(token) as any
    const { username, password, phone, email, img, gender } = req.filtered

    const foundUser: UsersEntity | null = await dataSource.getRepository(UsersEntity).findOne({
      where: {
        id,
      },
    })

    let hashPassword
    if (password) {
      hashPassword = hashpassword(password)
    }

    const updateUser: void | UpdateResult = await dataSource
      .getRepository(UsersEntity)
      .createQueryBuilder()
      .update(UsersEntity)
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
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    if (updateUser) {
      res.status(200).json({
        message: <string>"User has been updated",
        status: <number>200,
      })
    }
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { token } = req.headers as any
    const { id } = verify(token) as any

    const foundUser: UsersEntity | null = await dataSource.getRepository(UsersEntity).findOne({
      where: {
        id,
      },
    })

    if (foundUser) {
      await dataSource
        .createQueryBuilder()
        .delete()
        .from(UsersEntity)
        .where({ id })
        .execute()
        .catch((err: Exeption) => next(new Exeption(err.message, 500)))

      res.status(202).json({
        message: <string>"User has been deleted",
        status: <number>202,
      })
      return
    }
    res.status(404).json({
      message: <string>"User not found",
      status: <number>404,
    })
  },
}
