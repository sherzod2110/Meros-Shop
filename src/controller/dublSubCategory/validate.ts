import Joi from "joi"

export const dublSubCategoryCreate: Joi.ObjectSchema<any> = Joi.object({
  title: Joi.string().max(65).required(),
  subCatId: Joi.string().required(),
})

export const dublSubCategoryUpdate: Joi.ObjectSchema<any> = Joi.object({
  title: Joi.string().max(65),
})
