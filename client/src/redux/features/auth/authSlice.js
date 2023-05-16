import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
}

export const registerUser = createAsyncThunk('auth/registerUser', async ({ email, password }) => {
  try {
    const { data } = await axios.post('https://app-recipe-book.onrender.com/auth/register', {
      email,
      password,
    })
    if (data.token) {
      window.localStorage.setItem('token', data.token)
    }

    return data
  } catch (error) {
    console.log(error)
  }
})

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
  try {
    const { data } = await axios.post('https://app-recipe-book.onrender.com/auth/login', {
      email,
      password,
    })
    if (data.token) {
      window.localStorage.setItem('token', data.token)
    }

    return data
  } catch (error) {
    console.log(error)
  }
})

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const { data } = await axios.get('https://app-recipe-book.onrender.com/auth/me')
    return data
  } catch (error) {
    console.log(error)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      return {
        ...state,
        user: null,
        token: null,
        isLoading: null,
        status: null,
      }
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [registerUser.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        status: action.payload.message,
        user: action.payload.newUser,
        token: action.payload.token,
      }
    },
    [registerUser.rejected]: (state, action) => {
      return {
        ...state,
        status: action.payload.message,
        isLoading: false,
      }
    },

    [loginUser.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
        status: null,
      }
    },
    [loginUser.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        status: action.payload.message,
        user: action.payload.user,
        token: action.payload.token,
      }
    },
    [loginUser.rejected]: (state, action) => {
      return {
        ...state,
        status: action.payload.message,
        isLoading: false,
      }
    },

    [getMe.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
        status: null,
      }
    },
    [getMe.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        status: null,
        user: action.payload?.user,
        token: action.payload?.token,
      }
    },
    [getMe.rejected]: (state, action) => {
      return {
        ...state,
        status: action.payload.message,
        isLoading: false,
      }
    },
  },
})

export const checkAuth = (state) => Boolean(state.auth?.token)

export default authSlice.reducer
export const { logout } = authSlice.actions
