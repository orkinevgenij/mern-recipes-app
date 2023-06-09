import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check'
export const InfoPage = () => {
  const location = useLocation()
  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'hidden',
        paddingTop: '30px',
      }}
    >
      <CheckIcon fontSize='large' color='success' />
      <Typography variant='h5'>{location.state?.message}</Typography>
    </Stack>
  )
}
