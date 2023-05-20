import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from './axios'
import { setIsLoading } from '../redux/articlesReducer'

export const getArticles = createAsyncThunk(
  'articlesReducer/getArticles',
  async ({ pageNumber }, { rejectWithValue }) => {
    const response = await axios.get(`articles?limit=5&offset=${pageNumber}`).catch((error) => rejectWithValue(error))
    return response.data
  }
)

export const getArticleItem = createAsyncThunk(
  'articlesReducer/getArticleItem',
  async ({ slug }, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading())
    const response = await axios.get(`articles/${slug}`).catch((error) => rejectWithValue(error))

    return response.data.article
  }
)

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async ({ title, description, body, tagList }, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const response = await axios
      .post(
        'articles',
        {
          article: { title, description, body, tagList },
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => rejectWithValue(error))
    return response.data.article
  }
)

export const removeArticle = createAsyncThunk('articles/removeArticle', async ({ slug }, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  await axios
    .delete(`articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => rejectWithValue(error))
})

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ slug, title, description, body, tagList }, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const response = await axios
      .put(
        `articles/${slug}`,
        {
          article: { title, description, body, tagList },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => rejectWithValue(error))
    return response
  }
)

export const favoriteArticle = createAsyncThunk('articles/favoriteArticle', async ({ slug }, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  const response = await axios
    .post(
      `articles/${slug}/favorite`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((error) => rejectWithValue(error))
  return response.data.article
})

export const favoriteDelete = createAsyncThunk('articles/favoriteDelete', async ({ slug }) => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(`articles/${slug}/favorite`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.article
})
