import HttpError from "../helpers/HttpError.js"
import { isValidObjectId } from "mongoose"

const isValidId = (req, res, next) => {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `This ${id} is not valid id.`))
  }
  next()
}

export default isValidId