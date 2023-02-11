import Joi from "joi"

export const categoryCreate = Joi.object({
  title: Joi.string().max(65).required(),
})

export const categoryUpdate = Joi.object({
  title: Joi.string().max(65),
})
