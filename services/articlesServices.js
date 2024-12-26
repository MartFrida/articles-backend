import Article from "../models/Article.js";

export const getAllArticles = () => Article.find({})

export const getArticleById = async (id) => Article.findById(id)

export const addArticle = async (data) => Article.create(data)

export const updateArticleById = async (id, data) => Article.findByIdAndUpdate(id, data, { new: true, runValidators: true })

export const deleteArticleById = async (id) => Article.findByIdAndDelete(id)
