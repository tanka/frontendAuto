// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './shopSlice';
import userLocationReducer from './userLocationSlice';

export const store = configureStore({
  reducer: {
    shops: shopReducer,
    userLocation: userLocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;