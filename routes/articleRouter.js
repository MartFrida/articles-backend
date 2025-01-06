import express from 'express'
import validateBody from '../decorators/validateBody.js'
import articleControllers from '../controllers/articleControllers.js'
import { articleAddSchema, articleUpdateSchema } from '../schemas/articlesSchemas.js'
import isValidId from '../middlewares/isValidId.js'
import authtenticate from '../middlewares/authtenticate.js'

const articlesRouter = express.Router()

articlesRouter.get('/', articleControllers.getAllArticles)

articlesRouter.get('/:id', isValidId, articleControllers.getArticleById)

articlesRouter.get('/owner/:id', authtenticate, articleControllers.getAllArticlesByOwner)

articlesRouter.post('/', authtenticate, validateBody(articleAddSchema), articleControllers.addArticle)

articlesRouter.put('/:id', authtenticate, isValidId, validateBody(articleUpdateSchema), articleControllers.updateArticle)

articlesRouter.delete('/:id', authtenticate, isValidId, articleControllers.deleteArticle)

export default articlesRouter;