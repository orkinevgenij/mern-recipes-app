import { Stack, Typography } from '@mui/material'
import React from 'react'
import NoMealsIcon from '@mui/icons-material/NoMeals'
export const MyRecipesEmpty = () => {
  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      <NoMealsIcon fontSize='large' />
      <Typography variant='h5'>Личные рецепты отсутствуют</Typography>
    </Stack>
  )
}
