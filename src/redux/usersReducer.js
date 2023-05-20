import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser, getCurrentUser, updateUser, initAuth } from '../services/userService'

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
      localStorage.clear()
      state.token = false
      state.image = null
      state.password = null
      state.email = null
      state.username = null
      state.error = null
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = null
      localStorage.setItem('token', action.payload.token)
      state.token = action.payload.token
      state.data = action.payload
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = null
      localStorage.setItem('data', JSON.stringify(action.payload))
      localStorage.setItem('token', action.payload.token)
      state.token = action.payload.token
      state.data = action.payload
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    [getCurrentUser.pending]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      localStorage.getItem('data')
      state.isLoading = false
      state.error = null
      state.data = action.payload
      state.username = action.payload.username
      state.email = action.payload.email
      state.image = action.payload.image
    },
    [getCurrentUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    [updateUser.pending]: (state) => {
      state.error = null
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = null
      localStorage.setItem('token', action.payload.token)
      state.username = action.payload.username
      state.email = action.payload.email
      state.image = action.payload.image
      state.data = action.payload
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    [updateUser.pending]: (state) => {
      state.isLoading = true
      state.error = null
    },

    [initAuth.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = null
      state.data = action.payload ? action.payload.user : localStorage.getItem('data') || null
    },
    [initAuth.rejected]: (state) => {
      state.isLoading = false
      state.error = null
    },
  },
})

export const selectIsAuth = (state) => Boolean(state.users.data)
export const isAuth = (state) => Boolean(state.users.data)
export const { setUserData, setLogOut } = usersReducer.actions
export default usersReducer.reducer
