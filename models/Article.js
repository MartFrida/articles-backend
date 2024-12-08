import { Schema, model } from "mongoose";

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Why no title?'],
  },
  author: {
    type: String,
    required: [true, 'Why no author?'],
  },
  description: {
    type: String,
    required: [true, 'Why no description?'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tags:
  {
    type: String,
    enum: ['Java', 'JS', 'Ruby', 'Python'],
    required: [true, 'Why no tags? Tags may be Java, JS, Ruby, Python.'],
  },
}, { versionKey: false, timestamps: true })

const Article = model('article', articleSchema)

export default Article;