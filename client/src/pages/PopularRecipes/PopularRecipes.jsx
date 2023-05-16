import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RecipeItem } from '../../components/RecipeItem/RecipeItem'
import { getRecipes } from '../../redux/features/recipe/recipeSlice'
import { Grid } from '@mui/material'

export const PopularRecipes = () => {
  const { bestRecipes } = useSelector((state) => state.recipe)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])
  return (
    <Grid
      container
      gap={1}
      sx={{
        marginTop: '10px',
      }}
    >
      {bestRecipes?.map((recipe, index) => (
        <RecipeItem key={index} recipe={recipe} />
      ))}
    </Grid>
  )
}
