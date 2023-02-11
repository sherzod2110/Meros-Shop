import { ProductEntity } from "./../../entities/product.entity"
import { verify } from "./../../utils/jwt"
import { OrdersEntity } from "./../../entities/orders.entity"
import { Exeption } from "./../../exeption/exeption"
import { NextFunction, Request, Response } from "express"
import { AppDataSource as dataSource } from "../../config/ormconfig"
import redis from "../../config/redis"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const client = await redis()
    const cashOrder = await client?.get("order")

    if (!cashOrder) {
      const order: void | OrdersEntity[] = await dataSource
        .getRepository(OrdersEntity)
        .find({
          relations: {
            product: true,
          },
        })
        .catch((err: Exeption) => next(new Exeption(err.message, 500)))

      await client?.setEx("order", 15, JSON.stringify(order))

      res.status(200).json({
        status: <number>200,
        data: <void | OrdersEntity[]>order,
      })
      return
    }
    res.status(200).json({
      status: <number>200,
      data: JSON.parse(cashOrder),
    })
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { count, productId } = req.filtered as any

      const { token } = req.headers as any
      const { id } = verify(token) as any

      const founderProduct: ProductEntity | null = await dataSource.getRepository(ProductEntity).findOne({
        where: {
          id: productId,
        },
      })

      const founderOrder: OrdersEntity | null = await dataSource.getRepository(OrdersEntity).findOne({
        where: {
          product: { id: productId },
          user: { id: id },
        },
      })

      if (!founderOrder) {
        const newCount = (founderProduct?.sotildi + count) as any
        await dataSource
          .getRepository(OrdersEntity)
          .createQueryBuilder()
          .insert()
          .into(OrdersEntity)
          .values({ count, product: productId, user: id })
          .execute()

        await dataSource
          .getRepository(ProductEntity)
          .createQueryBuilder()
          .update(ProductEntity)
          .set({ sotildi: newCount })
          .where({ id: productId })
          .execute()

        res.status(201).json({
          message: <string>"Created",
          status: <number>201,
        })
      }

      if (founderOrder) {
        const newCount = founderOrder?.count + count
        const soldProduct = founderProduct?.sotildi + count

        await dataSource
          .getRepository(OrdersEntity)
          .createQueryBuilder()
          .update(OrdersEntity)
          .set({ count: newCount })
          .where({ id: productId })
          .execute()
          .catch((err: Exeption) => next(new Exeption(err.message, 200)))

        res.status(201).json({
          message: <string>"success",
          status: <number>201,
        })

        await dataSource
          .getRepository(ProductEntity)
          .createQueryBuilder()
          .update(ProductEntity)
          .set({ sotildi: soldProduct })
          .where({ id: productId })
          .execute()
          .catch((err: Exeption) => next(new Exeption(err.message, 200)))

        res.status(201).json({
          status: <number>201,
          data: <string>"Order has been created",
        })
      }
    } catch (error: unknown) {
      next((error: any) => new Exeption(error.message, 500))
    }
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const { count, productId } = req.filtered as any

    await dataSource
      .getRepository(OrdersEntity)
      .createQueryBuilder()
      .update(OrdersEntity)
      .set({ count, product: productId })
      .where({ id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(200).json({
      message: <string>"Order has been updated",
      status: <number>200,
    })
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    await dataSource
      .createQueryBuilder()
      .delete()
      .from(OrdersEntity)
      .where({ id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(200).json({
      message: <string>"Order has been deletd",
      status: <number>200,
    })
  },
}
