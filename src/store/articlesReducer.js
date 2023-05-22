import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getArticles, getArticleItem, favoriteDelete, favoriteArticle, createArticle, removeArticle, updateArticle } from '../services/articlesService'

export const fetchArticles = createAsyncThunk(
  'articlesReducer/getArticles',
  async ({ pageNumber }, { rejectWithValue }) => {
    return await getArticles({ pageNumber }, rejectWithValue)
  })

export const fetchArticleItem = createAsyncThunk(
  'articlesReducer/getArticleItem',
  async ({ slug }, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading())
    return await getArticleItem({ slug }, rejectWithValue, dispatch)
  })

export const fetchCreateArticle = createAsyncThunk(
  'articles/createArticle',
  async ({ title, description, body, tagList }, { rejectWithValue }) => {
    return await createArticle({ title, description, body, tagList }, rejectWithValue)
  })

export const fetchRemoveArticle = createAsyncThunk(
  'articles/removeArticle',
  async ({ slug }, { rejectWithValue }) => {
    return await removeArticle({ slug }, rejectWithValue)
  })

export const fetchUpdateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ slug, title, description, body, tagList }, { rejectWithValue }) => {
    return await updateArticle({ slug, title, description, body, tagList }, rejectWithValue)
  })

export const fetchFavoriteArticle = createAsyncThunk(
  'articles/favoriteArticle',
  async ({ slug }, { rejectWithValue }) => {
    return await favoriteArticle({ slug }, rejectWithValue)
  })

export const fetchFavoriteDelete = createAsyncThunk(
  'articles/favoriteDelete',
  async ({ slug }) => {
    return await favoriteDelete({ slug })
  })

const articlesReducer = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesCount: 0,
    articleItem: [],
    pageNumber: 1,
    isLoading: true,
    tagList: [],
    error: null,
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload
    },
    setIsLoading: (state) => {
      state.isLoading = !state.isLoading
    },
    setTagList: (state, action) => {
      state.tagList = Array.from(new Set([...state.tagList, action.payload]))
    },
    removeTagList: (state, action) => {
      state.tagList = state.tagList.filter((tag) => tag !== action.payload)
    },
    clearTagList: (state) => {
      state.tagList = []
    },
    setIsEditTagList: (state) => {
      state.tagList = [...state.articleItem.tagList]
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.articles = [...action.payload.articles]
      state.isLoading = false
      state.error = null
      state.articlesCount = action.payload.articlesCount
    },
    [fetchArticles.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [fetchArticleItem.pending]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [fetchArticleItem.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = null
      state.articleItem = action.payload
      state.tagList = action.payload.tagList
    },
    [fetchArticleItem.rejected]: (state, action) => {
      state.isLoading = false
      state.articleItem = null
      state.error = action.payload
    },

    [fetchFavoriteArticle.fulfilled]: (state, action) => {
      state.isLoading = false
      state.articles = state.articles.map((article) =>
        article.slug === action.payload.slug ? action.payload : article
      )
      localStorage.setItem(`like_${action.payload.slug}`, true)
    },
    [fetchFavoriteArticle.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    [fetchFavoriteDelete.fulfilled]: (state, action) => {
      state.isLoading = false
      state.articles = state.articles.map((article) =>
        article.slug === action.payload.slug ? action.payload : article
      )
      localStorage.removeItem(`like_${action.payload.slug}`, false)
    },
    [fetchFavoriteDelete.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { setPageNumber, setIsLoading, setTagList, removeTagList, clearTagList, setIsEditTagList } =
  articlesReducer.actions
export default articlesReducer.reducer
