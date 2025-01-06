import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

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
  owner:
  {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
}, { versionKey: false, timestamps: true })

articleSchema.post('save', handleSaveError)

articleSchema.pre('findOneAndUpdate', setUpdateSettings)

articleSchema.post('findOneAndUpdate', handleSaveError)

const Article = model('article', articleSchema)

export default Article;