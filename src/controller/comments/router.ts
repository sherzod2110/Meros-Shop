import { Router } from "express"
import Comment from "./comments"
import validate from "../../middlewares/validate"
import { Comments, CommentsUpdate } from "./validate"

const router: Router = Router()

export default router
  .get("/get", Comment.GET)
  .post("/create", validate(Comments), Comment.POST)
  .put("/update/:id", validate(CommentsUpdate), Comment.PUT)
  .delete("/delete/:id", Comment.DELETE)
