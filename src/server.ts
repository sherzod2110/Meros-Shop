import express, { Application, Response, Request } from "express"
import { AppDataSource } from "./config/ormconfig"
import routes from "./controller/index"
import errorHandler from "./middlewares/errorHandler"
import swagger from "swagger-ui-express"
import docs from "./docs.json"
import cors from "cors"

const main = async (): Promise<void> => {
  const app: Application = express()

  try {
    await AppDataSource.initialize()
    app.use(cors)
    app.use(express.json())
    app.use(routes)
    app.use(errorHandler)
    app.use("/api", swagger.serve, swagger.setup(docs))
    app.all("/*", (req: Request, res: Response) =>
      res.status(404).json({
        messsage: <string>"Page not found",
        status: <number>404,
      }),
    )
  } catch (err: unknown) {
    console.log("Server Error")
  } finally {
    app.listen(9090, (): void => {
      console.log(9090)
    })
  }
}

main()
