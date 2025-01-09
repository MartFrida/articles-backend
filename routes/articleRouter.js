import express from 'express'
import validateBody from '../decorators/validateBody.js'
import articleControllers from '../controllers/articleControllers.js'
import { articleAddSchema, articleUpdateSchema } from '../schemas/articlesSchemas.js'
import isValidId from '../middlewares/isValidId.js'
import authtenticate from '../middlewares/authtenticate.js'
import upload from '../middlewares/upload.js'

const articlesRouter = express.Router()

articlesRouter.get('/', articleControllers.getAllArticles)

articlesRouter.get('/:id', isValidId, articleControllers.getArticleById)

articlesRouter.get('/owner/:id', authtenticate, articleControllers.getAllArticlesByOwner)

// upload.fields([{name:'photo', maxCount:1}])
// upload.array('photo', 3)
articlesRouter.post('/', upload.single("photo"), authtenticate, validateBody(articleAddSchema), articleControllers.addArticle)

articlesRouter.put('/:id', authtenticate, isValidId, validateBody(articleUpdateSchema), articleControllers.updateArticle)

articlesRouter.delete('/:id', authtenticate, isValidId, articleControllers.deleteArticle)

export default articlesRouter;