import Article from "../models/Article.js";

export const getAllArticles = () => Article.find({})

export const getArticlesByFilter = (filter) => Article.find(filter, '-createdAt -updatedAt')

export const getArticleById = (id) => Article.findById(id)

export const addArticle = (data) => Article.create(data)

export const updateArticleByFilter = (filter, data) => Article.findOneAndUpdate(filter, data, { new: true, runValidators: true })

export const deleteArticleById = (id) => Article.findByIdAndDelete(id)

export const deleteArticleByfilter = filter => Article.findOneAndDelete(filter)
