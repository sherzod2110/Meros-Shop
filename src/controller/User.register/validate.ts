import Joi from "joi"

export const userCreateValidate: Joi.ObjectSchema<any> = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.string(),
  email: Joi.string(),
  img: Joi.string(),
  gender: Joi.string(),
})

export const userUpdate: Joi.ObjectSchema<any> = Joi.object({
  username: Joi.string(),
  password: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
  img: Joi.string(),
  gender: Joi.string(),
})


