import { ProductEntity } from "./../../entities/product.entity"
import { AppDataSource as dataSource } from "../../config/ormconfig"
import { Response, Request, NextFunction } from "express"

export default {
  GET_REYTING_SORT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const productRateSort: ProductEntity[] = await dataSource.getRepository(ProductEntity).find({
      relations: {
        reyting: true,
        comment: {
          user: true,
        },
      },
      order: {
        reyting: {
          reyting: "ASC",
        },
      },
    })

    res.status(200).json({
      status: <number>200,
      data: productRateSort,
    })
  },

  GET_SALES_SORT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const productRateSort: ProductEntity[] = await dataSource.getRepository(ProductEntity).find({
      relations: {
        reyting: true,
        comment: {
          user: true,
        },
      },
      order: {
        price: "ASC",
      },
    })

    res.status(200).json({
      status: <number>200,
      data: productRateSort,
    })
  },

  GET_CHEGIRMA_SORT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const productRateSort: ProductEntity[] = await dataSource.getRepository(ProductEntity).find({
      relations: {
        reyting: true,
        comment: {
          user: true,
        },
      },
      order: {
        chegirma: "ASC",
      },
    })

    res.status(200).json({
      status: <number>200,
      data: productRateSort,
    })
  },
}
