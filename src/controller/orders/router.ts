import { Router } from "express"
import order from "./orders"
import validate from "../../middlewares/validate"
import { OrderValidate, OrderUpdate } from "./validate"

const router: Router = Router()

export default router
  .get("/get", order.GET)
  .post("/create", validate(OrderValidate), order.POST)
  .put("/update/:id", validate(OrderUpdate), order.PUT)
  .delete("/delete/:id", order.DELETE)
