import { Exeption } from "./../../exeption/exeption"
import { ProductEntity } from "../../entities/product.entity"
import { NextFunction, Request, Response } from "express"
import { AppDataSource as dataSource } from "../../config/ormconfig"
import redis from "../../config/redis"
export default {
  GET: async (req: Request, res: Response, next: NextFunction) => {
    const client = await redis()
    const cashProducts: string | null | undefined = await client?.get("allProducts")

    if (!cashProducts) {
      const products: ProductEntity[] = await dataSource.getRepository(ProductEntity).find({
        relations: {
          reyting: true,
          comment: {
            user: true,
          },
        },
        select: {
          comment: {
            id: true,
            title: true,
            user: {
              id: true,
              username: true,
              img: true,
            },
          },
        } as any,
      })

      await client?.setEx("allProducts", 15, JSON.stringify(products))

      return res.status(200).json({
        status: <number>200,
        data: products,
      })
    }

    res.status(200).json({
      status: <number>200,
      data: JSON.parse(cashProducts),
    })
  },

  GET_PAGENATION: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, page } = req.query
      const lim: number = Number(limit)
      const pag: number = Number(page)

      const client = await redis()
      const cashProducts = (await client?.get("allProduct")) as any

      if (!cashProducts) {
        const products: ProductEntity[] = await dataSource.getRepository(ProductEntity).find({
          relations: {
            reyting: true,
            comment: {
              user: true,
            },
          },
          select: {
            comment: {
              id: true,
              title: true,
              user: {
                id: true,
                username: true,
                img: true,
              },
            },
          } as any,
        })
        const LimitOffset: ProductEntity[] = products.slice((pag - 1) * lim, lim * pag)

        await client?.setEx("allProduct", 15, JSON.stringify(products))

        return res.status(200).json({
          status: <number>200,
          data: LimitOffset,
        })
      }

      const data = JSON.parse(cashProducts)

      const LimitOffset = data.slice((pag - 1) * lim, lim * pag)

      res.status(200).json({
        status: <number>200,
        data: LimitOffset,
      })
    } catch (error: any) {
      next(new Exeption(error.message, 500))
    }
  },

  GET_ID: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    const founderUser: void | ProductEntity[] = await dataSource
      .getRepository(ProductEntity)
      .find({
        where: { id },
        relations: {
          comment: {
            user: true,
          },
          reyting: true,
        },
        select: {
          comment: {
            id: true,
            title: true,
            user: {
              id: true,
              username: true,
              img: true,
            },
          },
        } as any,
      })
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(200).json({
      status: <number>200,
      data: founderUser,
    })
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, price, comments, brand, size, author, sotildi, discription, color, madeIn, img, img1, dublSubId } =
      req.filtered

    const allProducts: ProductEntity | null = await dataSource.getRepository(ProductEntity).findOne({
      where: {
        title,
        price,
        comments,
        brand,
        size,
        author,
        discription,
        color,
        sotildi,
        madeIn,
        img,
        img1,
        dublSubId,
      },
    })

    if (allProducts) {
      res.status(401).json({
        message: <string>"Bunday Product mavjud",
      })
      return
    }

    await dataSource
      .getRepository(ProductEntity)
      .createQueryBuilder("product")
      .insert()
      .into(ProductEntity)
      .values({
        title,
        price,
        comments,
        brand,
        size,
        author,
        discription,
        sotildi,
        color,
        madeIn,
        img,
        img1,
        dublSubId,
      })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(200).json({
      message: <string>"Product has been created",
      status: <number>200,
    })
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const { title, price, comments, brand, size, author, discription, sotildi, color, madeIn, img, img1, dublSubId, chegirma } =
      req.filtered as any
    const founder = (await dataSource.getRepository(ProductEntity).findOne({
      where: {
        id,
      },
    })) as any
    const newPrice: number = founder?.price - (founder?.price * chegirma) / 100

    await dataSource
      .createQueryBuilder()
      .update(ProductEntity)
      .set({
        title,
        price,
        new_price: newPrice,
        comments,
        brand,
        size,
        author,
        discription,
        color,
        sotildi,
        madeIn,
        img,
        img1,
        chegirma,
        dublSubId,
      })
      .where("id = :id", { id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, err.status)))

    res.status(200).json({
      message: <string>"Product has been created update",
      status: <number>200,
    })
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    await dataSource
      .createQueryBuilder()
      .delete()
      .from(ProductEntity)
      .where("id = :id", { id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(200).json({
      message: <string>"Product has been deleted",
      status: <number>200,
    })
  },
}
