import { AddCircle, RemoveCircle } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, MenuItem, Paper, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ReactEditor } from '../../components/ReactEditor'
import { updatedRecipe } from '../../redux/features/recipe/recipeSlice'
import axios from '../../utils/axios'
const categories = [
  { value: 1, label: 'Основные блюда' },
  { value: 2, label: 'Блины, оладьи, сырники' },
  { value: 3, label: 'Супы и бульоны' },
  { value: 4, label: 'Соусы и заправки' },
  { value: 5, label: 'Салаты' },
  { value: 6, label: 'Выпечка' },
  { value: 7, label: 'Пельмени и вареники' },
  { value: 8, label: 'Домашние заготовки' },
  { value: 9, label: 'Закуски' },
  { value: 10, label: 'Напитки' },
  { value: 11, label: 'Десерты' },
  { value: 12, label: 'Блюда на мангале' },
  { value: 13, label: 'Коктейли' },
]

export const EditRecipe = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState([''])
  const [category, setCategory] = useState('')
  const [time, setTime] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const selectedChange = (event) => {
    setCategory(event.target.value)
  }
  const handleAdd = () => {
    const value = [...ingredients, []]
    setIngredients(value)
  }

  const handleChange = (onChangeValue, index) => {
    const inputData = [...ingredients]
    inputData[index] = onChangeValue.target.value
    setIngredients(inputData)
  }
  const handleRemove = (index) => {
    const remove = [...ingredients]
    remove.splice(index, 1)
    setIngredients(remove)
  }
  const recipeEdit = async () => {
    const { data } = await axios.get(`http://localhost:4001/recipes/${id}`)
    setTitle(data.title)
    setDescription(data.description)
    setIngredients(data.ingredients)
    setCategory(data.category)
    setTime(data.time)
    setOldImage(data.imgUrl)
  }
  const handleSubmit = () => {
    try {
      const updateRecipe = new FormData()
      updateRecipe.append('title', title)
      updateRecipe.append('description', description)
      updateRecipe.append('ingredients', ingredients)
      updateRecipe.append('category', category)
      updateRecipe.append('time', time)
      updateRecipe.append('image', newImage)
      updateRecipe.append('id', id)
      dispatch(updatedRecipe(updateRecipe))
      navigate('/recipes/info', { state: { message: 'Рецепт сохранен' } })
    } catch (error) {
      console.log(error)
    }
  }
  const clear = () => {
    setTitle('')
    setDescription('')
    setIngredients([''])
    setTime('')
  }
  useEffect(() => {
    recipeEdit()
  }, [id])

  return (
    <>
      <Grid component='form' onSubmit={(e) => e.preventDefault()}>
        <Paper
          sx={{
            padding: '20px',
            height: 'max-content',
            width: '70%',
            margin: '20px auto',
          }}
          elevation={10}
        >
          <Grid align='center'>
            <TextField
              type='file'
              onChange={(e) => {
                setNewImage(e.target.files[0])
                setOldImage('')
              }}
              sx={{
                marginBottom: 1,
              }}
            />

            {oldImage && (
              <Box>
                <img src={`http://localhost:4001/${oldImage}`} alt='img' height={200} />
              </Box>
            )}
            {newImage && (
              <Box>
                <img src={URL.createObjectURL(newImage)} alt='img' height={200} />
              </Box>
            )}

            <TextField
              label='Название'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              fullWidth
              sx={{
                marginBottom: 1,
              }}
            />
            <TextField
              label='Выберите категорию'
              value={category}
              select
              helperText='Пожалуйста, выберите категорию'
              onChange={selectedChange}
              fullWidth
              sx={{
                marginBottom: 1,
              }}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              value={time}
              type='time'
              onChange={(e) => setTime(e.target.value)}
              fullWidth
            />
            <IconButton>
              <AddCircle onClick={handleAdd} color='success' fontSize='large' />
            </IconButton>
          </Grid>
          <Grid
            direction='column'
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {ingredients.map((data, index) => {
              return (
                <>
                  <TextField
                    value={data}
                    placeholder='Добавить ингредиент'
                    onChange={(e) => handleChange(e, index)}
                  />
                  <IconButton>
                    <RemoveCircle
                      onClick={() => handleRemove(index)}
                      color='success'
                      fontSize='large'
                    />
                  </IconButton>
                </>
              )
            })}
          </Grid>
          <ReactEditor description={description} setDescription={setDescription} />
          <Stack
            spacing={2}
            direction='row'
            sx={{
              justifyContent: 'center',
            }}
          >
            <Button
              type='submit'
              color='success'
              variant='contained'
              size='medium'
              onClick={handleSubmit}
            >
              Сохранить
            </Button>
            <Button type='submit' color='success' variant='contained' size='medium' onClick={clear}>
              Отменить
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </>
  )
}
