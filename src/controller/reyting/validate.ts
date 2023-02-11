import Joi from "joi"

export const reytingValidate: Joi.ObjectSchema<any> = Joi.object({
  all_count: Joi.number().max(5),
  productId: Joi.string().required(),
})
