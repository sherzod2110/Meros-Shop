import { CommentsEntity } from "../../entities/comments.entity"
import { Exeption } from "./../../exeption/exeption"
import { NextFunction, Request, Response } from "express"
import { AppDataSource as dataSource } from "../../config/ormconfig"
import { verify } from "../../utils/jwt"
import redis from "../../config/redis"
import { DeleteResult, UpdateResult } from "typeorm"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const client = await redis()
    const cashComment = await client?.get("allComments")

    if (!cashComment) {
      const comment: void | CommentsEntity[] = await dataSource
        .getRepository(CommentsEntity)
        .find({
          relations: {
            user: true,
          },
          select: {
            user: {
              id: true,
              username: true,
              img: true,
            },
          } as any,
        })
        .catch((err: Exeption) => next(new Exeption(err.message, 500)))

      await client?.setEx("allComments", 15, JSON.stringify(comment))

      res.status(200).json({
        status: <number>200,
        data: <void | CommentsEntity[]>comment,
      })
      return
    }
    res.status(200).json({
      status: <number>200,
      data: JSON.parse(cashComment),
    })
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, producId } = req.filtered as any

    const { token } = req.headers as any
    const user = verify(token) as any

    await dataSource
      .getRepository(CommentsEntity) 
      .createQueryBuilder("dublsubcategory")
      .insert()
      .into(CommentsEntity)
      .values({ title, product: producId, user: user })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(201).json({
      message: <string>"Comment has been created",
      status: <number>201,
    })
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const { title } = req.body

    const updateComment: void | UpdateResult = await dataSource
      .getRepository(CommentsEntity)
      .createQueryBuilder()
      .update()
      .set({ title })
      .where({ id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    if (updateComment) {
      res.status(200).json({
        message: <string>"Comment has been updated",
        status: <number>200,
      })
    }
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    const deleted: void | DeleteResult = await dataSource
      .createQueryBuilder()
      .delete()
      .from(CommentsEntity)
      .where("id = :id", { id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    if (deleted) {
      res.status(200).json({
        message: <string>"Comment has been deleted",
        status: <number>200,
      })
    }
  },
}
