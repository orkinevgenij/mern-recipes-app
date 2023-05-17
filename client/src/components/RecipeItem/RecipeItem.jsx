import { Comment, Timer, Visibility } from '@mui/icons-material'
import {
  Badge,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import { Skeleton } from './Skeleton'

export const RecipeItem = ({ recipe }) => {
  if (!recipe) {
    return <Skeleton />
  }
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      sx={{
        display: 'grid',
      }}
    >
      <Card elevation={2}>
        <Link to={`/recipes/${recipe._id}`}>
          <CardMedia
            component='img'
            height='150px'
            image={recipe.imgUrl && `http://localhost:4001/${recipe.imgUrl}`}
            alt={recipe.title}
          />
        </Link>
        <CardContent align='center'>
          <Stack direction='column'>
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              gap={1}
              variant='body2'
            >
              <Timer color='success' />
              {recipe?.time}
            </Typography>
            <Typography
              gutterBottom
              variant='h5'
              component={Link}
              to={`/recipes/${recipe._id}`}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              {recipe.title}
            </Typography>
          </Stack>
          <CardActions
            sx={{
              gap: 1,
              justifyContent: 'center',
            }}
          >
            <Badge
              showZero
              badgeContent={recipe.comments?.length}
              color='success'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <Comment fontSize='small' color='success' />
            </Badge>
            <Badge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={recipe.views}
              color='success'
            >
              <Visibility fontSize='small' color='success' />
            </Badge>
          </CardActions>

          <Typography variant='overline'>
            {format(new Date(recipe?.createdAt), 'dd/MM/yyyy')}
          </Typography>
          <Typography variant='body1'>{recipe.email}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
