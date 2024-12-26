import * as authServices from '../services/authServices.js'
import ctrlWrapper from '../decorators/ctrlWrapper.js'
import HttpError from '../helpers/HttpError.js'

const signup = async (req, res) => {
  const { email } = req.body
  const user = await authServices.findUser({ email })
  if (user) {
    throw HttpError(409, "This email already in use")
  }
  const newUser = await authServices.signup(req.body)

  res.status(201).json({
    esername: newUser.username,
    email: newUser.email,
    password: newUser.password,
  })
}

export default {
  signup: ctrlWrapper(signup),
}