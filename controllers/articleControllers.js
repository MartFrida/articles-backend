import * as articlesServices from '../services/articlesServices.js'
import HttpError from '../helpers/HttpError.js'
import { articleAddSchema, articleUpdateSchema } from '../schemas/articlesSchemas.js'
import ctrlWrapper from '../decorators/ctrlWrapper.js'

const getAllArticles = async (req, res) => {
  const result = await articlesServices.getAllArticles();
  res.json(result)
}

const getArticleById = async (req, res) => {
  const { id } = req.params
  const result = await articlesServices.getArticleById(id)
  if (!result)
    throw HttpError(404, `Article with ID ${id} not found`)
  res.json(result)
}

const addArticle = async (req, res) => {
  // const { error } = articleAddSchema.validate(req.body)
  // if (error) {
  //   throw HttpError(400, error.message)
  // }
  const result = await articlesServices.addArticle(req.body)
  res.status(201).json(result)
}

const updateArticle = async (req, res) => {
  const { error } = articleUpdateSchema.validate(req.body)
  if (error) {
    throw HttpError(400, error.message)
  }
  const { id } = req.params
  const result = await articlesServices.updateArticleById(id)
  if (!result)
    throw HttpError(404, `Article with ID ${id} not found`)
  res.json(result)
}

const deleteArticle = async (req, res) => {
  const { id } = req.params
  const result = await articlesServices.deleteArticleById(id)
  if (!result)
    throw HttpError(404, `Article with ID ${id} not found`)

  res.status(204).send()

  res.json({
    message: 'Delete success'
  })
}

export default {
  getAllArticles: ctrlWrapper(getAllArticles),
  getArticleById: ctrlWrapper(getArticleById),
  addArticle: ctrlWrapper(addArticle),
  updateArticle: ctrlWrapper(updateArticle),
  deleteArticle: ctrlWrapper(deleteArticle)
}