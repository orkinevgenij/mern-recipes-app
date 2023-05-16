import { Delete, Edit } from '@mui/icons-material'
import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, Button, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  createComment,
  getRecipeComments,
  removeComment,
} from '../redux/features/comment/commentSlice'

export const CommentBlock = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const { id } = useParams()
  const { comments } = useSelector((state) => state.comment)

  const handleSubmit = () => {
    try {
      dispatch(createComment({ id, comment }))
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }
  const fetchComments = useCallback(async () => {
    try {
      dispatch(getRecipeComments(id))
    } catch (error) {
      console.log(error)
    }
  }, [id, dispatch])

  const handleRemoveComment = (commentId) => {
    dispatch(removeComment(commentId))
  }

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  return (
    <Stack
      sx={{
        marginBottom: '20px',
      }}
    >
      <Paper
        sx={{
          mt: '5px',
          padding: '10px',
        }}
      >
        <Typography variant='h6' gutterBottom>
          Отзывы:
        </Typography>
        <Stack
          component='form'
          onSubmit={(e) => e.preventDefault()}
          sx={{
            alignItems: 'flex-start',
          }}
        >
          <TextField
            placeholder='Поделитесь впечатлениями'
            variant='outlined'
            color='success'
            multiline
            rows={5}
            maxRows={10}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin='normal'
          />
          <Button
            color='success'
            type='submit'
            variant='contained'
            sx={{
              display: 'inline-block',
            }}
            onClick={handleSubmit}
          >
            Отправить
          </Button>
        </Stack>

        <Stack
          spacing={2}
          sx={{
            marginTop: '5px',
          }}
        >
          {comments?.map((comment, index) => (
            <Stack
              sx={{
                bgcolor: '#dbf6e0',
                borderRadius: '5px',
                padding: '5px',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'CaptionText',
                }}
                alt={comment.author}
              >
                {comment.author.substr(0, 2)}
              </Avatar>
              <Typography variant='overline'>
                {format(new Date(comment.createdAt), 'dd/MM/yyyy')}
              </Typography>
              <Typography variant='body2'>{comment.comment}</Typography>
              <Stack display='inline'>
                <IconButton component={Link} to={`/comments/edit/${comment._id}`}>
                  <Edit color='secondary' fontSize='small' />
                </IconButton>
                <IconButton onClick={() => handleRemoveComment(comment._id)}>
                  <Delete color='secondary' fontSize='small' />
                </IconButton>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Stack>
  )
}
