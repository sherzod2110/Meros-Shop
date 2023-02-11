import { DublSubCategoryEntity } from "./../../entities/dublSubCategory.entity"
import { Exeption } from "./../../exeption/exeption"
import { NextFunction, Request, Response } from "express"
import { AppDataSource as dataSource } from "../../config/ormconfig"
import redis from "../../config/redis"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const client = await redis()
    const cashDublCategory = await client?.get("dublCategory")

    if (!cashDublCategory) {
      const dublCategory: void | DublSubCategoryEntity[] = await dataSource
        .getRepository(DublSubCategoryEntity)
        .find({
          relations: { 
            product: true,
          },
        })
        .catch((err: Exeption) => next(new Exeption(err.message, 500)))

      await client?.setEx("dublCategory", 15, JSON.stringify(dublCategory))

      res.status(200).json({
        status: <number>200,
        data: <void | DublSubCategoryEntity[]>dublCategory,
      })
      return
    }

    res.status(200).json({
      status: <number>200,
      data: JSON.parse(cashDublCategory),
    })
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, subCatId } = req.filtered

    const allSubCategory: DublSubCategoryEntity | null = await dataSource.getRepository(DublSubCategoryEntity).findOne({
      where: {
        title,
        subCatId,
      },
    })

    if (allSubCategory) {
      res.status(401).json({
        message: <string>"Bunday SubCategory mavjud",
      })
      return
    }

    await dataSource
      .getRepository(DublSubCategoryEntity)
      .createQueryBuilder("subcategory")
      .insert()
      .into(DublSubCategoryEntity)
      .values({ title, subCatId })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(201).json({
      status: <number>201,
      message: <string>"Dubl Sub Category has been created",
    })
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const { title } = req.filtered

    await dataSource
      .createQueryBuilder()
      .update(DublSubCategoryEntity)
      .set({ title })
      .where("id = :id", { id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(200).json({
      message: <string>"Dubl Sub Category has been update",
      status: <number>200,
    })
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    await dataSource
      .createQueryBuilder()
      .delete()
      .from(DublSubCategoryEntity)
      .where("id = :id", { id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(200).json({
      message: <string>"Dubl Sub Category has been Delete",
      status: <number>200,
    })
  },
}
