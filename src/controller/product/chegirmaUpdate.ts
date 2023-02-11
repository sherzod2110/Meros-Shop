import { Exeption } from "./../../exeption/exeption"
import { ProductEntity } from "../../entities/product.entity"
import { NextFunction, Request, Response } from "express"
import { AppDataSource as dataSource } from "../../config/ormconfig"

// BIRINCHI PRODUCT CREATE QILADI KEYIN CHIGIRMA QIMAOQCHI BUSA ADMIN SHU YERDAN UPDATE QILIB CHEGIRMA COLUMN GA YOZIB QUYADI
export default {
  PUT_CHEGIRMA: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const { chegirma } = req.filtered as any

    const founder: any = (await dataSource.getRepository(ProductEntity).findOne({
      where: {
        id,
      },
    }))

    const newPrice: number = founder?.price - (founder?.price * chegirma) / 100

    await dataSource
      .createQueryBuilder()
      .update(ProductEntity)
      .set({
        chegirma,
        new_price: newPrice,
      })
      .where("id = :id", { id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, err.status)))

    res.status(200).json({
      message: <string> "Chegirma has been update",
      status: <number> 200,
    })
  },
}
