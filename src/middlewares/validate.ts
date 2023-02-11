import { NextFunction, Request, Response } from "express"
import { ObjectSchema } from "joi"
import { Exeption } from "../exeption/exeption"

export default (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body)

    if (error) {
      return next(new Exeption(error.message, 422))
    }
    req.filtered = value
    next()
  }
}
