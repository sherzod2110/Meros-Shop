import { Router } from "express"
import product from "./product"
import sort from "./product.sort"
import chegirma from "./chegirmaUpdate"
import validate from "../../middlewares/validate"
import { productValidate, productUpdate } from "./validate"

const router: Router = Router()

export default router
  .get("/get/all", product.GET)
  .get("/get/pagenation", product.GET_PAGENATION)
  .get("/get/one/:id", product.GET_ID)
  .get("/get/reyting/sort", sort.GET_REYTING_SORT)
  .get("/get/sales/sort", sort.GET_SALES_SORT)
  .get("/get/chegirma/sort", sort.GET_CHEGIRMA_SORT)
  .post("/create", validate(productValidate), product.POST)
  .put("/update/:id", validate(productUpdate), product.PUT)
  .put("/update/chegirma/:id", validate(productUpdate), chegirma.PUT_CHEGIRMA)
  .delete("/delete/:id", product.DELETE)
