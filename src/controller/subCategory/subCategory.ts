import { Exeption } from "./../../exeption/exeption"
import { SubCategoryEntity } from "../../entities/subCategory.entity"
import { NextFunction, Request, Response } from "express"
import { AppDataSource as dataSource } from "../../config/ormconfig"
import redis from "../../config/redis"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const client = await redis()
    const cashSubCategort: string | null | undefined = await client?.get("subCategory")

    if (!cashSubCategort) {
      const subCategory: void | SubCategoryEntity[] = await dataSource
        .getRepository(SubCategoryEntity)
        .find({
          relations: {
            dublSub: true,
          },
        })
        .catch((err: Exeption) => next(new Exeption(err.message, 500)))

      await client?.setEx("subCategory", 15, JSON.stringify(subCategory))

      res.status(200).json({
        status: <number>200,
        data: subCategory,
      })
      return
    }
    res.status(200).json({
      status: <number>200,
      data: JSON.parse(cashSubCategort),
    })
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, categoriesId } = req.filtered

    const allSubCategory: SubCategoryEntity | null = await dataSource.getRepository(SubCategoryEntity).findOne({
      where: {
        title,
        categoriesId,
      },
    })

    if (allSubCategory) {
      res.status(401).json({
        message: <string>"Bunday SubCategory mavjud",
      })
      return
    }

    await dataSource
      .getRepository(SubCategoryEntity)
      .createQueryBuilder("subcategory")
      .insert()
      .into(SubCategoryEntity)
      .values({ title, categoriesId })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(200).json({
      message: <string>"Sub Category has been created",
      status: <number>200,
    })
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const { title } = req.filtered

    if (typeof title === "string") {
      await dataSource
        .createQueryBuilder()
        .update(SubCategoryEntity)
        .set({ title })
        .where("id = :id", { id })
        .execute()
        .catch((err: Exeption) => next(new Exeption(err.message, 500)))

      res.status(200).json({
        message: <string>"Sub Category has been update",
        status: <number>200,
      })
    }
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    await dataSource
      .createQueryBuilder()
      .delete()
      .from(SubCategoryEntity)
      .where("id = :id", { id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(200).json({
      message: <string>"Sub Category has been Delete",
      status: <number>200,
    })
  },
}
