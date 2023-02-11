import { Router } from "express"
import Grade from "./reyting"
import Sort from "./reyting.sort"
import validate from "../../middlewares/validate"
import { reytingValidate } from "./validate"

const router: Router = Router()

export default router
  .get("/get", Grade.GET)
  .get("/get/reyting/sort", Sort.GET_SORT_REYTING)
  .post("/create", validate(reytingValidate), Grade.POST)
