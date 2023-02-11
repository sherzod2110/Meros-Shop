import { Exeption } from "./../../exeption/exeption"
import { CategoryEntity } from "./../../entities/category.entity"
import { NextFunction, Request, Response } from "express"
import { AppDataSource as dataSource } from "../../config/ormconfig"
import redis from "../../config/redis"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const client = await redis()
    const cashCategory: string | null | undefined = await client?.get("allCategory")

    if (!cashCategory) {
      const category: void | CategoryEntity[] = await dataSource
        .getRepository(CategoryEntity)
        .find({
          relations: {
            subCategories: true,
          },
        })
        .catch((err: Exeption) => next(new Exeption(err.message, 500)))

      await client?.setEx("allCategory", 15, JSON.stringify(category))

      res.status(200).json({
        status: <number>200,
        data: <void | CategoryEntity[]>category,
      })
      return
    }

    res.status(200).json({
      status: <number>200,
      data: JSON.parse(cashCategory),
    })
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title } = req.filtered

    const allCategory: CategoryEntity | null = await dataSource.getRepository(CategoryEntity).findOne({
      where: {
        title,
      },
    })

    if (allCategory) {
      res.status(401).json({
        message: <string>"Bunday Category mavjud",
      })
      return
    }

    await dataSource
      .getRepository(CategoryEntity)
      .createQueryBuilder("category")
      .insert()
      .into(CategoryEntity)
      .values({ title })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 501)))

    res.status(200).json({
      message: <string>"Category has been created",
      status: <number>200,
    })
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const { title } = req.filtered

    await dataSource
      .createQueryBuilder()
      .update(CategoryEntity)
      .set({ title })
      .where("id = :id", { id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, err.status)))

    res.status(200).json({
      message: <string>"Category has been updated",
      status: <number>200,
    })
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    await dataSource
      .createQueryBuilder()
      .delete()
      .from(CategoryEntity)
      .where({ id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 501)))

    res.status(200).json({
      message: <string>"Category has been deleted",
      status: <number>200,
    })
  },
}
