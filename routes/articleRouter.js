import express from 'express'

import articleControllers from '../controllers/articleControllers.js'

const articlesRouter = express.Router()

articlesRouter.get('/', articleControllers.getAllArticles)

articlesRouter.get('/:id', articleControllers.getArticleById)

articlesRouter.post('/', articleControllers.addArticle)

articlesRouter.put('/:id', articleControllers.updateArticle)

articlesRouter.delete('/:id', articleControllers.deleteArticle)

export default articlesRouter;