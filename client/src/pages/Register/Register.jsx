import React, { useEffect, useState } from 'react'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { Lock } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkAuth, registerUser } from '../../redux/features/auth/authSlice'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
const schema = yup.object().shape({
  email: yup.string().email('Не верный формат Email').required('Введите ваш Email'),
  password: yup
    .string()
    .min(5, 'Ваш пароль не надежный. Минимум 5 символов')
    .required('Введите ваш пароль'),
})
export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(checkAuth)
  const { status } = useSelector((state) => state.auth)
  const handleRegistration = (values) => {
    try {
      dispatch(registerUser(values))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status) toast(status)
    if (isAuth) navigate('/')
  }, [status, navigate, isAuth])
  return (
    <>
      <Grid component='form' onSubmit={handleSubmit(handleRegistration)}>
        <Paper
          elevation={10}
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
              Регистрация
            </Typography>
          </Grid>
          <TextField
            margin='normal'
            variant='standard'
            fullWidth
            label='Email'
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email')}
          />
          <TextField
            margin='normal'
            variant='standard'
            required
            type='password'
            fullWidth
            label='Password'
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password')}
          />
          <Button size='large' color='success' variant='contained' type='submit'>
            Войти
          </Button>
          <Typography variant='body2'>
            Уже есть аккаунт?{' '}
            <Link
              to='/login'
              style={{
                textDecoration: 'none',
                color: '#199e0a',
              }}
            >
              Войти
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  )
}
