import { Add, MenuBook } from '@mui/icons-material'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Icon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkAuth, logout } from '../../redux/features/auth/authSlice'

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const isAuth = useSelector(checkAuth)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const logoutHandler = () => {
    window.localStorage.removeItem('token')
    dispatch(logout())
    handleClose()
  }

  return (
    <AppBar
      position='static'
      sx={{
        bgcolor: '#fff',
      }}
      elevation={1}
    >
      <Container maxWidth='md'>
        <Toolbar>
          <Typography
            variant='h6'
            component={Box}
            sx={{
              flexGrow: 1,
            }}
          >
            <Link
              to='/'
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Icon
                sx={{
                  mr: '10px',
                }}
              >
                <img src='./img/logo.png' alt='' height={25} width={25} />
              </Icon>
            </Link>
          </Typography>
          <Stack
            direction='row'
            gap={1}
            sx={{
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button component={Link} to='/' color='success' variant='outlined'>
              Главная
            </Button>
            <Button
              component={Link}
              to='/recipes/addrecipe'
              startIcon={<Add />}
              color='success'
              variant='outlined'
            >
              Добавить рецепт
            </Button>
            <Button
              component={Link}
              to='/recipes/popular'
              startIcon={<Add />}
              color='success'
              variant='outlined'
            >
              Популярные
            </Button>
            <Button
              component={Link}
              to='/recipes/myrecipes'
              startIcon={<MenuBook />}
              color='success'
              variant='outlined'
            >
              Мои рецепты
            </Button>
            {isAuth ? (
              <Avatar
                sx={{
                  bgcolor: 'success.main',
                  cursor: 'pointer',
                }}
                id='basic-button'
                onClick={handleClick}
                aria-control={open ? 'basic-menu' : undefined}
                aria-aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                {user?.email.substr(0, 2)}
              </Avatar>
            ) : (
              <Button variant='outlined' color='success' component={Link} to='/login'>
                Войти
              </Button>
            )}
          </Stack>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={logoutHandler}>
              <Typography variant='body2' color='text.success'>
                Выйти
              </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
