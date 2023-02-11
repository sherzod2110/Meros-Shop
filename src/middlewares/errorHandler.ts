import { NextFunction, Request, Response } from "express"
import { Exeption } from "../exeption/exeption"

export default (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof Exeption) {
    res.status(err.status).json({
      message: err.message,
      status: err.status,
    })
    return
  }

  res.status(500).json({
    message: <string> "Internal Server Error",
    status: <number> 500,
  })
}
