import Joi from "joi"

export const OrderValidate: Joi.ObjectSchema<any> = Joi.object({
  count: Joi.number().required(),
  productId: Joi.string().required(),
})

export const OrderUpdate: Joi.ObjectSchema<any> = Joi.object({
  count: Joi.number(),
  productId: Joi.string().required(),
})
