import { Router } from "express"
import subCategory from "./subCategory"
import validate from "../../middlewares/validate"
import { subCategoryCreate, subCategoryUpdate } from "./validate"

const router: Router = Router()

export default router
  .get("/get", subCategory.GET)
  .post("/create", validate(subCategoryCreate), subCategory.POST)
  .put("/update/:id", validate(subCategoryUpdate), subCategory.PUT)
  .delete("/delete/:id", subCategory.DELETE)
