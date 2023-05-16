import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import {
  createRecipe,
  getAllRecipes,
  removeRecipe,
  updateRecipe,
  getRecipeById,
  getMyRecipes,
  getRecipeComment,
} from '../controllers/recipe.js'
const router = new Router()

router.get('/', getAllRecipes)
router.post('/', checkAuth, createRecipe)

router.get('/user/myrecipes', checkAuth, getMyRecipes)
router.put('/:id', checkAuth, updateRecipe)
router.get('/:id', getRecipeById)
router.delete('/:id', checkAuth, removeRecipe)


router.get('/comments/:id', getRecipeComment)

export default router
