import Joi from 'joi'

export const articleAddSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
  tags: Joi.string().valid('Relax', 'Mind', 'Body', 'Salud'),
})

export const articleUpdateSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  description: Joi.string(),
  tags: Joi.string().valid('Relax', 'Mind', 'Body', 'Salud'),
})