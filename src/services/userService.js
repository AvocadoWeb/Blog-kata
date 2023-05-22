import axios from 'axios'

const _baseURL = 'https://blog.kata.academy/api/'

export const registerUser = async ({ username, password, email }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${_baseURL}/users`, {
      user: { username, email, password },
    })
    !localStorage.getItem('token') && localStorage.setItem('token', response.data.user.token)

    return response.data.user
  } catch (error) {
    return rejectWithValue(error)
  }
}


export const loginUser = async ({ email, password }, { rejectWithValue }) => {
  const response = await axios
    .post(`${_baseURL}users/login`, {
      user: { email, password },
    })
    .catch((error) => rejectWithValue(error))
  return response.data.user
}

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${_baseURL}user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data.user
  } catch (err) {
    return ''
  }
}

export const updateUser = async ({ username, email, password, image, token }, { rejectWithValue }) => {
  const response = await axios
    .put(
      `${_baseURL}user`,
      { user: { username, email, password, image, token } },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    .catch((error) => rejectWithValue(error))
  return response.data.user
}

export const initAuth = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    const response = await axios.get(`${_baseURL}user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    localStorage.setItem('data', JSON.stringify(response.data))
    return response.data
  }

  return null
}
