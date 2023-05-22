import axios from './axios'

export const getArticles = async ({ pageNumber }, { rejectWithValue }) => {
  const response = await axios
    .get(`articles?limit=5&offset=${pageNumber}`)
    .catch((error) => rejectWithValue(error))
  return response.data
}

export const getArticleItem = async ({ slug }, { rejectWithValue }) => {
  const response = await axios
    .get(`articles/${slug}`)
    .catch((error) => rejectWithValue(error))
  return response.data.article
}

export const createArticle = async ({ title, description, body, tagList }, { rejectWithValue }) => {
  const response = await axios
    .post('articles',
      {
        article: { title, description, body, tagList },
      }
    )
    .catch((error) => rejectWithValue(error))
  return response.data.article
}

export const removeArticle = async ({ slug }, { rejectWithValue }) => {
  await axios
    .delete(`articles/${slug}`)
    .then((response) => response)
    .catch((error) => rejectWithValue(error))
}

export const updateArticle = async ({ slug, title, description, body, tagList }, { rejectWithValue }) => {
  const response = await axios
    .put(`articles/${slug}`,
      {
        article: { title, description, body, tagList },
      }
    )
    .catch((error) => rejectWithValue(error))
  return response
}

export const favoriteArticle = async ({ slug }, { rejectWithValue }) => {
  const response = await axios
    .post(`articles/${slug}/favorite`, {})
    .catch((error) => rejectWithValue(error))
  return response.data.article
}

export const favoriteDelete = async ({ slug }) => {
  const response = await axios
    .delete(`articles/${slug}/favorite`)
  return response.data.article
}
/*
export const getArticles = createAsyncThunk(
  'articlesReducer/getArticles',
  async ({ pageNumber }, { rejectWithValue }) => {
    const response = await axios
    .get(`articles?limit=5&offset=${pageNumber}`)
    .catch((error) => rejectWithValue(error))
    return response.data
  }
)*/
/*
export const getArticleItem = createAsyncThunk(
  'articlesReducer/getArticleItem',
  async ({ slug }, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading())
    const response = await axios
      .get(`articles/${slug}`)
      .catch((error) => rejectWithValue(error))
    return response.data.article
  }
)*/
/*
export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async ({ title, description, body, tagList }, { rejectWithValue }) => {
    const response = await axios
      .post('articles',
        {
          article: { title, description, body, tagList },
        }
      )
      .catch((error) => rejectWithValue(error))
    return response.data.article
  }
)*/
/*
export const removeArticle = createAsyncThunk(
  'articles/removeArticle',
  async ({ slug }, { rejectWithValue }) => {
    await axios
      .delete(`articles/${slug}`)
      .then((response) => response)
      .catch((error) => rejectWithValue(error))
  })*/
/*
export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ slug, title, description, body, tagList }, { rejectWithValue }) => {
    const response = await axios
      .put(`articles/${slug}`,
        {
          article: { title, description, body, tagList },
        }
      )
      .catch((error) => rejectWithValue(error))
    return response
  }
)*/
/*
export const favoriteArticle = createAsyncThunk('articles/favoriteArticle', async ({ slug }, { rejectWithValue }) => {
  const response = await axios
    .post(`articles/${slug}/favorite`, {})
    .catch((error) => rejectWithValue(error))
  return response.data.article
})

export const favoriteDelete = createAsyncThunk('articles/favoriteDelete', async ({ slug }) => {
  const response = await axios
    .delete(`articles/${slug}/favorite`)
  return response.data.article
})*/
