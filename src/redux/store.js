import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { friendsReducer } from './friends/friendsSlice';
import { modalReducer } from './modal/modalSlice';
import { postsReducer } from './posts/postsSlice';

const friendsConfig = {
  key: 'friends',
  storage,
  whitelist: ['friends'],
  // blacklist: ['filter'],
};

export const store = configureStore({
  reducer: {
    friendsScope: persistReducer(friendsConfig, friendsReducer),
    modal: modalReducer,
    posts: postsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
