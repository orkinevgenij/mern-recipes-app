import { Button, ButtonGroup, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/axios'
import { useDispatch } from 'react-redux'
import { updateComment } from '../redux/features/comment/commentSlice'
export const EditComment = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const getOneComment = async () => {
    const { data } = await axios.get(`http://localhost:4001/comments/${id}`)
    setComment(data.comment)
  }

  const editComment = () => {
    dispatch(updateComment({ comment, id }))
    navigate(-1)
  }
  const onCancel = () => {
    navigate(-1)
  }

  useEffect(() => {
    getOneComment()
  }, [id])
  return (
    <Stack component='form' onSubmit={(e) => e.preventDefault()}>
      <Paper
        sx={{
          padding: '20px',
          height: 'max-content',
          width: '70%',
          margin: '20px auto',
        }}
      >
        <Stack>
          <Typography textAlign='center'>Внесите изменения в комментарий</Typography>
          <TextField value={comment} onChange={(e) => setComment(e.target.value)} color='success' />
          <ButtonGroup
            sx={{
              gap: 1,
              justifyContent: 'center',
              padding: '10px',
            }}
          >
            <Button type='submit' onClick={editComment} color='success' variant='contained'>
              Сохранить
            </Button>
            <Button color='success' variant='contained' onClick={onCancel}>
              Отменить
            </Button>
          </ButtonGroup>
        </Stack>
      </Paper>
    </Stack>
  )
}
