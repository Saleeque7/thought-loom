import { configureStore ,combineReducers  } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: sessionStorage, 
  };
  
  const reducer = combineReducers({
      user:userSlice,
  })
  
  const persistedReducer = persistReducer(persistConfig,reducer)
  
  export const store = configureStore({
  reducer:{
      persisted:persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: false,
      }),
      devTools: process.env.NODE_ENV !== 'production',
  })
  
  
  export const persistor = persistStore(store);