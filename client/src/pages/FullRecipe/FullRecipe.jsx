import { ArrowBackIos, Delete, Edit, Restaurant, Timer, Visibility } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import HTMLReactParser from 'html-react-parser'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as LinkRouter, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CommentBlock } from '../../components/CommentBlock'
import { removeRecipe } from '../../redux/features/recipe/recipeSlice'
import axios from '../../utils/axios'

export const FullRecipe = () => {
  const [recipe, setRecipe] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { user } = useSelector((state) => state.auth)

  const removeRecipeHandler = () => {
    if (window.confirm('Вы точно хотите удалить рецепт')) {
      dispatch(removeRecipe(params.id))
      toast('Рецепт был удален')
      navigate('/recipes/info', { state: { message: 'Рецепт удален' } })
    }
  }

  const getOneRecipe = useCallback(async () => {
    try {
      const { data } = await axios.get(`https://app-recipe-book.onrender.com/recipes/${params.id}`)
      setRecipe(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [params.id])

  useEffect(() => {
    getOneRecipe()
  }, [getOneRecipe])

  if (loading) {
    return (
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <CircularProgress
          sx={{
            margin: '0px auto',
          }}
          color='success'
        />
      </Box>
    )
  }
  return (
    <>
      <Paper
        sx={{
          padding: '10px',
          marginTop: '10px',
        }}
      >
        <Grid>
          <Button
            color='success'
            variant='contained'
            component={LinkRouter}
            to='/'
            startIcon={<ArrowBackIos />}
          >
            Назад
          </Button>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item>
              <Card>
                <Typography variant='h6' align='center'>
                  {recipe?.title}
                </Typography>
                <CardMedia
                  component='img'
                  height='200px'
                  image={`https://app-recipe-book.onrender.com/${recipe?.imgUrl}`}
                  alt={recipe?.title}
                />
                <CardContent>
                  <Typography
                    variant='body2'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    gap={1}
                  >
                    <Timer color='success' />
                    {recipe?.time}
                  </Typography>
                  <CardActions>
                    <IconButton color='success'>
                      <Visibility fontSize='medium' />
                      <Typography variant='body1'>{recipe.views}</Typography>
                    </IconButton>
                    {user?._id === recipe?.author ? (
                      <IconButton color='success'>
                        <Delete onClick={removeRecipeHandler} fontSize='medium' />
                      </IconButton>
                    ) : (
                      ''
                    )}
                    {user?._id === recipe?.author ? (
                      <IconButton color='success'>
                        <LinkRouter to={`/recipes/${params.id}/edit`}>
                          <Edit fontSize='medium' color='success' />
                        </LinkRouter>
                      </IconButton>
                    ) : (
                      ''
                    )}
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>Ингредиенты </Typography>
              <List>
                {recipe?.ingredients?.map((ingredient) => (
                  <ListItem>
                    <ListItemIcon>
                      <Restaurant fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <Grid>
            <Typography variant='h5'>Описание</Typography>
            <Typography variant='body1'>{HTMLReactParser(recipe.description)}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <CommentBlock />
    </>
  )
}
