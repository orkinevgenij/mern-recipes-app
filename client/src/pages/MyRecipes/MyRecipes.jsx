import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MyRecipesEmpty } from '../../components/MyRecipesEmpty'
import { RecipeItem } from '../../components/RecipeItem/RecipeItem'
import axios from '../../utils/axios'
export const MyRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMyRecipes = async () => {
    try {
      const { data } = await axios.get('http://localhost:4001/recipes/user/myrecipes')
      setRecipes(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMyRecipes()
  }, [loading])

  if (!recipes.length) {
    return <MyRecipesEmpty />
  }
  return (
    <Grid
      container
      gap={1}
      sx={{
        marginTop: '10px',
      }}
    >
      {loading === true ? (
        <CircularProgress
          sx={{
            margin: '0px auto',
          }}
          color='success'
        />
      ) : (
        recipes?.map((recipe, index) => <RecipeItem key={index} recipe={recipe} />)
      )}
    </Grid>
  )
}
