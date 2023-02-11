import { Reyting } from "./../../entities/reyting.entity"
import { Exeption } from "../../exeption/exeption"
import { NextFunction, Request, Response } from "express"
import { AppDataSource as dataSource } from "../../config/ormconfig"
import redis from "../../config/redis"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const client = await redis()
    const cashReyting = await client?.get("reyting")

    if (!cashReyting) {
      const grade: Reyting[] = await dataSource.getRepository(Reyting).find()

      await client?.setEx("reyting", 15, JSON.stringify(grade))

      res.status(200).json({
        status: <number>200,
        data: grade,
      })
      return
    }
    res.status(200).json({
      status: <number>200,
      data: JSON.parse(cashReyting),
    })
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { all_count, productId } = req.filtered as any

      const foundProduct: Reyting[] = await dataSource.getRepository(Reyting).find({
        where: {
          product: {
            id: productId,
          },
        },
      })

      if (!foundProduct.length) {
        await dataSource
          .getRepository(Reyting)
          .createQueryBuilder()
          .insert()
          .into(Reyting)
          .values({ person_count: 1, reyting: all_count, all_count, product: productId })
          .execute()
          .catch((err: Exeption) => next(new Exeption(err.message, 500)))

        res.status(201).json({
          status: <number>201,
          message: <string>"Success create",
        })
        return
      }

      if (foundProduct.length) {
        const Count: number = foundProduct[0].person_count + 1
        const AllCount: any = foundProduct[0].all_count + all_count
        const id: string = foundProduct[0].id
        const Reytin: number = AllCount / Count

        await dataSource
          .getRepository(Reyting)
          .createQueryBuilder()
          .update()
          .set({ product: productId, all_count: AllCount, reyting: Reytin, person_count: Count })
          .where({ id })
          .execute()
          .catch((err: Exeption) => next(new Exeption(err.message, 500)))

        res.status(200).json({
          message: <string> "Success Update",
          status: <number> 200,
        })
      }
    } catch (error: any) {
      next(new Exeption(error.message, 500))
    }
  },
}
