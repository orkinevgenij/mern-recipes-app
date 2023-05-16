import React, { useEffect } from 'react'
import { Lock } from '@mui/icons-material'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkAuth, loginUser } from '../../redux/features/auth/authSlice'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
const schema = yup.object().shape({
  email: yup.string().email('Не верный формат Email').required('Введите ваш Email'),
  password: yup.string().required('Введите ваш пароль'),
})
export const Login = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.auth)
  const isAuth = useSelector(checkAuth)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const handleLogin = (values) => {
    try {
      dispatch(loginUser(values))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status) toast(status)
    if (isAuth) navigate('/')
  }, [status, navigate, isAuth])

  return (
    <Grid component='form' onSubmit={handleSubmit(handleLogin)}>
      <Paper
        elevation={15}
        align='center'
        sx={{
          padding: '20px',
          height: 'max-content',
          width: '50%',
          margin: '20px auto',
        }}
      >
        <Grid align='center'>
          <Avatar sx={{ backgroundColor: '#199e0a' }}>
            <Lock />
          </Avatar>
          <Typography gutterBottom variant='h5'>
            Войдите
          </Typography>
        </Grid>
        <TextField
          label='Email'
          variant='standard'
          margin='normal'
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email')}
        />
        <TextField
          label='Пароль'
          type='password'
          variant='standard'
          margin='normal'
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password')}
        />

        <Button size='large' color='success' variant='contained' type='submit'>
          Войти
        </Button>
        <Typography variant='body2'>
          У вас нет учетной записи?
          <Link
            to='/register'
            style={{
              textDecoration: 'none',
              color: '#199e0a',
            }}
          >
            Присоединиться?
          </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}
