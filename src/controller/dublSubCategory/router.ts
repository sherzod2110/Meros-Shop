import { Router } from "express"
import dublSubCategory from "./dublSubCategory"
import validate from "../../middlewares/validate"
import { dublSubCategoryCreate, dublSubCategoryUpdate } from "./validate"

const router: Router = Router()

export default router
  .get("/get", dublSubCategory.GET)
  .post("/create", validate(dublSubCategoryCreate), dublSubCategory.POST)
  .put("/update/:id", validate(dublSubCategoryUpdate), dublSubCategory.PUT)
  .delete("/delete/:id", dublSubCategory.DELETE)
