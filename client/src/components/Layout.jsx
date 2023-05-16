import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header/Header'
import { Container } from '@mui/material'
export const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Outlet />
      </Container>
    </>
  )
}
