import Article from "../models/Article.js";

export const getAllArticles = (offset, limit) => Article.find().skip(offset).limit(limit)

export const getArticlesByFilter = (filter, query = {}) => Article.find(filter, '-createdAt -updatedAt', query)

export const getArticlesCountByFilter = (filter) => Article.countDocuments(filter)

export const getArticleById = (id) => Article.findById(id)

export const addArticle = (data) => Article.create(data)

export const updateArticleByFilter = (filter, data) => Article.findOneAndUpdate(filter, data, { new: true, runValidators: true })

export const deleteArticleById = (id) => Article.findByIdAndDelete(id)

export const deleteArticleByfilter = filter => Article.findOneAndDelete(filter)
