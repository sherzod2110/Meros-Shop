import Joi from "joi"

export const subCategoryCreate: Joi.ObjectSchema<any> = Joi.object({
  title: Joi.string().max(65).required(),
  categoriesId: Joi.string().max(65).required(),
})

export const subCategoryUpdate: Joi.ObjectSchema<any> = Joi.object({
  title: Joi.string().max(65),
})
