import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './articlesReducer'
import usersReducer from './usersReducer'

export default configureStore({
  reducer: {
    articles: articlesReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
