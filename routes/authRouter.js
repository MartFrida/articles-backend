import express from 'express'
import validateBody from '../decorators/validateBody.js'
import { signupSchema, signinSchema } from '../schemas/usersSchemas.js'
import authControllers from '../controllers/authControllers.js'


const authRouter = express.Router()

authRouter.post('/signup', validateBody(signupSchema), authControllers.signup)

export default authRouter