import * as articlesServices from '../services/articlesServices.js'
import HttpError from '../helpers/HttpError.js'
import ctrlWrapper from '../decorators/ctrlWrapper.js'
import cloudinary from '../helpers/cloudinary.js'

const getAllArticles = async (req, res) => {
  const { page = 1, limit = 50 } = req.query
  const skip = (page - 1) * limit
  const result = await articlesServices.getAllArticles(skip, limit);
  const total = await articlesServices.getArticlesCountByFilter()
  res.json({
    total,
    result,
  })
}

const getAllArticlesByOwner = async (req, res) => {
  const { _id: owner } = req.user
  const { page = 1, limit = 5 } = req.query
  const skip = (page - 1) * limit
  const result = await articlesServices.getArticlesByFilter({ owner }, { skip, limit })
  const total = await articlesServices.getArticlesCountByFilter({ owner })
  res.json({
    total,
    result,
  })
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
  // const { url: photo } = await cloudinary.uploader.upload(req.file.path, {
  //   folder: 'articles'
  // })
  console.log(req.body)
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