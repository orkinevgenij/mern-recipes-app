import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'
const initialState = {
  recipes: [],
  bestRecipes: [],
  category: 0,
  searchValue: '',
  isLoading: null,
}

export const createRecipe = createAsyncThunk('recipe/createRecipe', async (params) => {
  try {
    const { data } = await axios.post('https://app-recipe-book.onrender.com/recipes', params)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const getRecipes = createAsyncThunk('recipe/getRecipes', async () => {
  const { data } = await axios.get('https://app-recipe-book.onrender.com/recipes')
  return data
})

export const removeRecipe = createAsyncThunk('recipe/removeRecipe', async (id) => {
  try {
    const { data } = await axios.delete(`https://app-recipe-book.onrender.com/recipes/${id}`, id)
    return data
  } catch (error) {
    console.log(error)
  }
})
export const updatedRecipe = createAsyncThunk('recipe/updateRecipe', async (updateRecipe) => {
  try {
    const { data } = await axios.put(
      `https://app-recipe-book.onrender.com/recipes/${updateRecipe.id}`,
      updateRecipe,
    )
    return data
  } catch (error) {
    console.log(error)
  }
})
export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
  },
  extraReducers: {
    [createRecipe.pending]: (state, action) => {
      state.isLoading = true
    },
    [createRecipe.fulfilled]: (state, action) => {
      state.isLoading = false
      state.recipes.push(action.payload)
    },
    [createRecipe.rejected]: (state, action) => {
      state.isLoading = false
    },

    [getRecipes.pending]: (state, action) => {
      state.isLoading = true
    },
    [getRecipes.fulfilled]: (state, action) => {
      state.isLoading = false
      state.recipes = action.payload.recipes
      state.bestRecipes = action.payload.bestRecipes
    },
    [getRecipes.rejected]: (state, action) => {
      state.isLoading = false
    },

    [removeRecipe.pending]: (state, action) => {
      state.isLoading = true
    },
    [removeRecipe.fulfilled]: (state, action) => {
      state.isLoading = false
      state.recipes = state.recipes.filter((obj) => obj._id !== action.payload._id)
    },
    [removeRecipe.rejected]: (state, action) => {
      state.isLoading = false
    },

    [updatedRecipe.pending]: (state, action) => {
      state.isLoading = true
    },
    [updatedRecipe.fulfilled]: (state, action) => {
      state.isLoading = false
      const recipe = state.recipes.findIndex((obj) => obj._id === action.payload._id)
      state.recipes[recipe] = action.payload
    },
    [updatedRecipe.rejected]: (state, action) => {
      state.isLoading = false
    },
  },
})

export default recipeSlice.reducer
export const { setCategory, setSearchValue } = recipeSlice.actions
