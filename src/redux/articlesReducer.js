import { createSlice } from '@reduxjs/toolkit'
import { getArticles, getArticleItem, favoriteDelete, favoriteArticle } from '../services/articlesService'

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
    [getArticles.pending]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [getArticles.fulfilled]: (state, action) => {
      state.articles = [...action.payload.articles]
      state.isLoading = false
      state.error = null
      state.articlesCount = action.payload.articlesCount
    },
    [getArticles.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getArticleItem.pending]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [getArticleItem.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = null
      state.articleItem = action.payload
      state.tagList = action.payload.tagList
    },
    [getArticleItem.rejected]: (state, action) => {
      state.isLoading = false
      state.articleItem = null
      state.error = action.payload
    },

    [favoriteArticle.fulfilled]: (state, action) => {
      state.isLoading = false
      state.articles = state.articles.map((article) =>
        article.slug === action.payload.slug ? action.payload : article
      )
      localStorage.setItem(`like_${action.payload.slug}`, true)
    },
    [favoriteArticle.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    [favoriteDelete.fulfilled]: (state, action) => {
      state.isLoading = false
      state.articles = state.articles.map((article) =>
        article.slug === action.payload.slug ? action.payload : article
      )
      localStorage.removeItem(`like_${action.payload.slug}`, false)
    },
    [favoriteDelete.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { setPageNumber, setIsLoading, setTagList, removeTagList, clearTagList, setIsEditTagList } =
  articlesReducer.actions
export default articlesReducer.reducer
