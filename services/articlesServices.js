import { nanoid } from "nanoid";
import Article from "../models/Article.js";

export const getAllArticles = () => Article.find({}, "-createdAt")

export const getArticleById = async (id) => Article.findById(id)

export const addArticle = async (data) => Article.create(data)

export const updateArticleById = async (id, data) => Article.findByIdAndUpdate(id, data, { new: true, runValidators: true })

export const deleteArticleById = async (id) => Article.findByIdAndDelete(id)



////////////////////////////////////
// import fs from "fs/promises";
// import path from "path";
// import { nanoid } from "nanoid";

// const articlesPath = path.resolve("data", "articles.json");

// const updateArticles = articles => fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));

// export const getAllArticles = async () => {
//   const buffer = await fs.readFile(articlesPath);
//   return JSON.parse(buffer);
// }

// export const getArticleById = async (id) => {
//   const articles = await getAllArticles();
//   const result = articles.find(item => item.id === id);
//   return result || null;
// }

// export const addArticle = async (data) => {
//   const articles = await getAllArticles();
//   const newarticle = {
//     id: nanoid(),
//     createdAt: new Date().toJSON().slice(0, 16).replace('T', ' '),
//     ...data,
//   };
//   articles.push(newarticle);
//   await updateArticles(articles);
//   return newarticle;
// }

// export const updateArticleById = async (id, data) => {
//   const articles = await getAllArticles();
//   const index = articles.findIndex(item => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   articles[index] = { ...articles[index], ...data };
//   await updateArticles(articles);
//   return articles[index];
// }

// export const deleteArticleById = async (id) => {
//   const articles = await getAllArticles();
//   const index = articles.findIndex(item => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = articles.splice(index, 1);
//   await updateArticles(articles);
//   return result;
// }