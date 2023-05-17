import { Search } from '@mui/icons-material'
import { CircularProgress, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RecipeItem } from '../../components/RecipeItem/RecipeItem'
import { getRecipes, setSearchValue } from '../../redux/features/recipe/recipeSlice'
export const Main = () => {
  const { recipes, isLoading, searchValue } = useSelector((state) => state.recipe)

  const dispatch = useDispatch()
  const onChangeInput = (value) => {
    dispatch(setSearchValue(value))
    console.log(value)
  }
  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])

  return (
    <>
      <Grid
        sx={{
          textAlign: 'center',
          padding: '5px',
        }}
      >
        <TextField
          onChange={(e) => onChangeInput(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
          placeholder='Поиск рецепта'
          variant='outlined'
          color='success'
        />
      </Grid>

      <Typography textAlign='center' variant='h4'>
        ДОМАШНИЕ РЕЦЕПТЫ ПРИГОТОВЛЕНИЯ БЛЮД С ФОТО
      </Typography>
      <Grid container mt={1} spacing={1}>
        {isLoading ? (
          <CircularProgress
            sx={{
              margin: '0px auto',
            }}
            color='success'
          />
        ) : (
          recipes
            ?.filter((recipe) => recipe.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((recipe, index) => <RecipeItem recipe={recipe} key={index} />)
        )}
      </Grid>
    </>
  )
}
