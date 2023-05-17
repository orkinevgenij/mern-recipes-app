import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'
const initialState = {
  comments: [],
  isLoading: null,
}

export const createComment = createAsyncThunk('comment/createComment', async ({ id, comment }) => {
  try {
    const { data } = await axios.post(`http://localhost:4001/comments/${id}`, {
      id,
      comment,
    })
    return data
  } catch (error) {
    console.log(error)
  }
})
export const getRecipeComments = createAsyncThunk('comments/getPostComments', async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:4001/recipes/comments/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const removeComment = createAsyncThunk('comment/commentRemove', async (commentId) => {
  try {
    const { data } = await axios.delete(`http://localhost:4001/comments/${commentId}`)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const updateComment = createAsyncThunk('comment/updateComment', async ({ comment, id }) => {
  try {
    const { data } = await axios.patch(`http://localhost:4001/comments/${id}`, {
      comment,
    })
    return data
  } catch (error) {
    console.log(error)
  }
})

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: {
    [createComment.pending]: (state) => {
      state.isLoading = true
    },
    [createComment.fulfilled]: (state, action) => {
      state.isLoading = false
      state.comments.push(action.payload)
    },
    [createComment.rejected]: (state) => {
      state.isLoading = false
    },
    [getRecipeComments.pending]: (state) => {
      state.isLoading = true
    },
    [getRecipeComments.fulfilled]: (state, action) => {
      state.isLoading = false
      state.comments = action.payload
    },
    [getRecipeComments.rejected]: (state) => {
      state.isLoading = false
    },
    [updateComment.pending]: (state, action) => {
      state.isLoading = true
    },
    [updateComment.fulfilled]: (state, action) => {
      state.isLoading = false
      const comment = state.comments.findIndex((obj) => obj._id === action.payload._id)
      state.comments[comment] = action.payload
    },
    [updateComment.rejected]: (state, action) => {
      state.isLoading = false
    },

    [removeComment.pending]: (state, action) => {
      state.isLoading = true
    },
    [removeComment.fulfilled]: (state, action) => {
      state.isLoading = false
      state.comments = state.comments.filter((obj) => obj._id !== action.meta.arg)
      console.log(action.payload.id)
    },
    [removeComment.rejected]: (state, action) => {
      state.isLoading = false
    },
  },
})

export default commentSlice.reducer
