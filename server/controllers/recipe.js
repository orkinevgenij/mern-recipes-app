import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import Recipe from '../models/Recipe.js'
import User from '../models/User.js'
export const createRecipe = async (req, res) => {
  const { title, description, ingredients, category, time } = req.body
  try {
    const user = await User.findById(req.userId)
    if (req.files) {
      const imgName = Date.now().toString() + req.files.image.name
      const __dirname = dirname(fileURLToPath(import.meta.url))
      req.files.image.mv(path.join(__dirname, '..', 'uploads', imgName))

      const recipeWithImg = await Recipe.create({
        title,
        imgUrl: imgName,
        description,
        ingredients: ingredients.split(','),
        category,
        author: req.userId,
        email: user.email,
        time,
      })

      await User.findByIdAndUpdate(req.userId, {
        $push: { recipes: recipeWithImg },
      })
      return res.json(recipeWithImg)
    }
    const recipeWithout = await Recipe.create({
      title,
      imgUrl: '',
      description,
      ingredients: ingredients.split(','),
      category,
      author: req.userId,
      email: user.email,
      time,
    })
    await User.findByIdAndUpdate(req.userId, {
      $push: { recipes: recipeWithout },
    })
    res.json(recipeWithout)
  } catch (error) {
    console.log(error)
    res.json({
      message: 'Что-то пошло не так',
    })
  }
}

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort('-createdAt').populate('author').exec()
    const bestRecipes = await Recipe.find().sort('-views').limit(10)

    if (!recipes) {
      return res.status(500).json({
        message: 'Рецепты отсутствуют',
      })
    }

    res.json({ recipes, bestRecipes })
  } catch (error) {
    console.error
    res.json({
      message: 'Что-то пошло не так',
    })
  }
}

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    })
    res.json(recipe)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Рецепта не существует',
    })
  }
}
export const getMyRecipes = async (req, res) => {
  try {
    const { recipes } = await User.findById(req.userId).populate('recipes').exec()
    res.json(recipes)
  } catch (error) {
    console.log(error)
    res.json({
      message: 'Что-то пошло не так',
    })
  }
}

export const removeRecipe = async (req, res) => {
  const { id } = req.params
  try {
    console.log(id)
    const recipe = await Recipe.findByIdAndDelete(id)
    if (!recipe) {
      return res.json({
        message: 'Такого рецепта не существует',
      })
    }
    await User.findByIdAndUpdate(req.userId, {
      $pull: { recipes: id },
    })

    res.json({ message: 'Рецепт был удален' })
  } catch (error) {
    console.log(error)
    res.json({
      message: 'Что-то пошло не так',
    })
  }
}

export const updateRecipe = async (req, res) => {
  try {
    const { id, title, description, ingredients, category, time } = req.body
    const recipe = await Recipe.findById(id)
    if (req.files) {
      const imgName = Date.now().toString() + req.files.image.name
      const __dirname = dirname(fileURLToPath(import.meta.url))
      req.files.image.mv(path.join(__dirname, '..', 'uploads', imgName))
      recipe.imgUrl = imgName || ''
    }
    recipe.title = title
    recipe.description = description
    recipe.ingredients = ingredients.split(',')
    recipe.category = category
    recipe.time = time
    await recipe.save()
    res.json(recipe)
  } catch (error) {
    console.log(error)
    res.json({
      message: 'Что-то пошло не так',
    })
  }
}
export const getRecipeComment = async (req, res) => {
  try {
    const { comments } = await Recipe.findById(req.params.id).populate('comments').exec()
    res.json(comments)
  } catch (error) {
    console.log(error)
    res.json({
      message: 'Что-то пошло не так',
    })
  }
}
