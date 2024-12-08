import express from "express";
import cors from 'cors';
import morgan from "morgan";
import articlesRouter from "./routes/articleRouter.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.use('/api/articles', articlesRouter)

app.use((_, res) => {
  res.status(404).json({
    message: "Not Found"
  })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message })
})

console.log(process.env.DB_HOST)
const { DB_HOST, PORT = 3001 } = process.env

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
    })
  }
  )
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  });


