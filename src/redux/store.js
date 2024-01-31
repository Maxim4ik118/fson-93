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
import { authReducer } from './auth/authSlice';
import { contactsReducer } from './contacts/contactsSlice';

const friendsConfig = {
  key: 'friends',
  storage,
  whitelist: ['friends'],
};

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    friendsScope: persistReducer(friendsConfig, friendsReducer),
    modal: modalReducer,
    posts: postsReducer,
    auth: persistReducer(authConfig, authReducer),
    contacts: contactsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
