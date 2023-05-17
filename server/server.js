import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import recipeRoute from './routes/recipe.js'
import commentRoute from './routes/comment.js'
import fileUpload from 'express-fileupload'
const app = express()
dotenv.config()

const PORT = process.env.PORT || 4002
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

app.use(cors())
app.use(fileUpload())
app.use(json())
app.use(express.static('https://app-recipe-book.onrender.com/uploads'))

app.use('/auth', authRoute)
app.use('/recipes', recipeRoute)
app.use('/comments', commentRoute)

async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.4tmidgd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    )
    app.listen(PORT, () => console.log(`Server connected on port:${PORT}`))
  } catch (error) {
    console.log(error)
  }
}
connectDB()
