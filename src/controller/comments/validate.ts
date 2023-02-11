import Joi from "joi"

export const Comments: Joi.ObjectSchema<any> = Joi.object({
  title: Joi.string().required(),
  producId: Joi.string(),
})

export const CommentsUpdate: Joi.ObjectSchema<any> = Joi.object({
  title: Joi.string(),
})
