import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from './axios'

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async ({ username, password, email }, { rejectWithValue }) =>
    await axios
      .post('users', {
        user: { username, email, password },
      })
      .then((response) => response.data.user)
      .catch((error) => rejectWithValue(error))
)

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async ({ email, password }, { rejectWithValue }) =>
    await axios
      .post('users/login', {
        user: { email, password },
      })
      .then((response) => response.data.user)
      .catch((error) => rejectWithValue(error))
)

export const getCurrentUser = createAsyncThunk(
  'users/getCurrentUser',
  async ({ token }, { rejectWithValue }) =>
    await axios
      .get('user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data.user)
      .catch((error) => rejectWithValue(error))
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ username, email, password, image, token }, { rejectWithValue }) =>
    await axios
      .put(
        'user',
        { user: { username, email, password, image, token } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response.data.user)
      .catch((error) => rejectWithValue(error))
)

export const initAuth = createAsyncThunk('auth/initAuth', async () => {
  const token = localStorage.getItem('token')
  if (token) {
    const response = await axios.get('user', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    localStorage.setItem('data', JSON.stringify(response.data))
    return response.data
  }

  return null
})
