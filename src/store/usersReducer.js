import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { registerUser, loginUser, getCurrentUser, updateUser, initAuth } from '../services/userService'

export const fetchRegisterUser = createAsyncThunk(
  'users/registerUser',
  async ({ username, password, email }, { rejectWithValue }) => {
    return await registerUser({ username, password, email }, rejectWithValue)
  })

export const fetchLoginUser = createAsyncThunk(
  'users/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    return await loginUser({ email, password }, rejectWithValue)
  })

export const fetchCurrentUser = createAsyncThunk(
  'users/getCurrentUser',
  async () => {
    return await getCurrentUser()
  })

export const fetchUpdateUser = createAsyncThunk(
  'users/updateUser',
  async ({ username, email, password, image, token }, { rejectWithValue }) => {
    return await updateUser({ username, email, password, image, token }, rejectWithValue)
  })

export const fetchInitAuth = createAsyncThunk('auth/initAuth', async () => {
  return await initAuth()
})

const usersReducer = createSlice({
  name: 'users',
  initialState: {
    username: null,
    email: null,
    password: null,
    image: null,
    token: false,
    data: null,
    error: null,
    isLoading: true,
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload
      state.username = action.payload.username
      state.email = action.payload.email
      state.password = action.payload.password
    },
    setLogOut: (state) => {
      state.data = null
      localStorage.removeItem('token')
      state.token = false
      state.image = null
      state.password = null
      state.email = null
      state.username = null
      state.error = null
    },
  },
  extraReducers: {
    [fetchRegisterUser.pending]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [fetchRegisterUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = null
      localStorage.setItem('token', action.payload.token)
      state.token = action.payload.token
      state.data = action.payload
    },
    [fetchRegisterUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [fetchLoginUser.pending]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [fetchLoginUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = null
      localStorage.setItem('data', JSON.stringify(action.payload))
      localStorage.setItem('token', action.payload.token)
      state.token = action.payload.token
      state.data = action.payload
    },
    [fetchLoginUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    [fetchCurrentUser.pending]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      localStorage.getItem('data')
      state.isLoading = false
      state.error = null
      state.data = action.payload
      state.username = action.payload.username
      state.email = action.payload.email
      state.image = action.payload.image
    },
    [fetchCurrentUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    [fetchUpdateUser.pending]: (state) => {
      state.error = null
    },
    [fetchUpdateUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = null
      localStorage.setItem('token', action.payload.token)
      state.username = action.payload.username
      state.email = action.payload.email
      state.image = action.payload.image
      state.data = action.payload
    },
    [fetchUpdateUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    [fetchUpdateUser.pending]: (state) => {
      state.isLoading = true
      state.error = null
    },

    [fetchInitAuth.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = null
      state.data = action.payload ? action.payload.user : localStorage.getItem('data') || null
    },
    [fetchInitAuth.rejected]: (state) => {
      state.isLoading = false
      state.error = null
    },
  },
})

export const selectIsAuth = (state) => Boolean(state.users.data)
export const isAuth = (state) => Boolean(state.users.data)
export const { setUserData, setLogOut } = usersReducer.actions
export default usersReducer.reducer
