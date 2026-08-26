// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './shopSlice';
import userLocationReducer from './userLocationSlice';

// The configureStore creates a centralized state management system with two independent slices.
// Combines reducers – It takes an object of reducers and automatically combines them into a single root reducer.
export const store = configureStore({
  reducer: {
    shops: shopReducer, // // Manages shop data, filtering, and selection
    userLocation: userLocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// This creates a state tree with two branches (also called slices.  I can create more slices such as auth, reviews etc):
// const rootState = {
//   shops: {
//     shops: [...],              // All shops
//     filteredShops: [...],      // Filtered shops
//     selectedShop: null,        // Currently selected shop
//     loading: false,
//     error: null,
//     filters: { searchTerm: '', specialty: '', ... }
//   },
//   userLocation: {
//     coords: { latitude: 49.8951, longitude: -97.1384 },
//     status: 'idle'             // 'idle' | 'loading' | 'succeeded' | 'failed'
//   }
// }