import * as articlesServices from '../services/articlesServices.js'
import HttpError from '../helpers/HttpError.js'
import ctrlWrapper from '../decorators/ctrlWrapper.js'

const getAllArticles = async (req, res) => {
  const result = await articlesServices.getAllArticles();
  res.json(result)
}

const getAllArticlesByOwner = async (req, res) => {
  const { _id: owner } = req.user
  const result = await articlesServices.getArticlesByFilter({ owner })
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
  const { _id: owner } = req.user
  const result = await articlesServices.addArticle({ ...req.body, owner })
  res.status(201).json(result)
}

const updateArticle = async (req, res) => {
  const { id } = req.params
  const { _id: owner } = req.user
  const result = await articlesServices.updateArticleByFilter({ _id: id, owner }, req.body)
  if (!result)
    throw HttpError(404, `Article with ID ${id} not found`)
  res.json(result)
}

const deleteArticle = async (req, res) => {
  const { id } = req.params
  const { _id: owner } = req.user
  if (!owner) {
    throw HttpError(401, 'no owner')
  }
  const result = await articlesServices.deleteArticleByfilter({ _id: id, owner })
  if (!result)
    throw HttpError(404, `Article with ID ${id} not found`)

  // res.status(204).send()

  res.json({
    message: 'Delete success'
  })
}

export default {
  getAllArticles: ctrlWrapper(getAllArticles),
  getAllArticlesByOwner: ctrlWrapper(getAllArticlesByOwner),
  getArticleById: ctrlWrapper(getArticleById),
  addArticle: ctrlWrapper(addArticle),
  updateArticle: ctrlWrapper(updateArticle),
  deleteArticle: ctrlWrapper(deleteArticle)
}