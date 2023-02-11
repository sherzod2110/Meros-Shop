import { Router } from "express"
import routerRegister from "./User.register/router"
import routerCategory from "./categorie/router"
import routerSubCategory from "./subCategory/router"
import routerDublSubCategory from "./dublSubCategory/router"
import routerProduct from "./product/router"
import routerComments from "./comments/router"
import routerReyting from "./reyting/router"
import routerOrder from "./orders/router"

const router: Router = Router()

export default router
  .use("/user", routerRegister)
  .use("/category", routerCategory)
  .use("/subCategory", routerSubCategory)
  .use("/dublSubCategory", routerDublSubCategory)
  .use("/product", routerProduct)
  .use("/comments", routerComments)
  .use("/reyting", routerReyting)
  .use("/order", routerOrder)
