import { Router } from "express"
import users from "./users"
import validate from "../../middlewares/validate"
import { userCreateValidate, userUpdate } from "./validate"

const router: Router = Router()

export default router
  .get("/get", users.GET)
  .post("/create", validate(userCreateValidate), users.POST)
  .post("/login", validate(userCreateValidate), users.LOGIN)
  .put("/update", validate(userUpdate), users.PUT)
  .delete("/delete", users.DELETE)
