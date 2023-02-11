import { Router } from "express"
import category from "./category"
import validate from "../../middlewares/validate"
import { categoryCreate, categoryUpdate } from "./validate"

const router: Router = Router()

export default router
  .get("/get", category.GET)
  .post("/create", validate(categoryCreate), category.POST)
  .put("/update/:id", validate(categoryUpdate), category.PUT)
  .delete("/delete/:id", category.DELETE)
