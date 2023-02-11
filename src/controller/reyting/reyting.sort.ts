import { Reyting } from "./../../entities/reyting.entity"
import { Exeption } from "../../exeption/exeption"
import { NextFunction, Request, Response } from "express"
import { AppDataSource as dataSource } from "../../config/ormconfig"

export default {
  GET_SORT_REYTING: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const grade: void | Reyting[] = await dataSource
      .getRepository(Reyting)
      .find({
        order: {
          reyting: "ASC",
        },
      })
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(200).json({
      status: <number>200,
      data: grade,
    })
  },
}
