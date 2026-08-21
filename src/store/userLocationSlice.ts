// src/store/userLocationSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type UserLocationState } from '@/types';

interface Coords {
  latitude: number;
  longitude: number;
}

const DEFAULT_COORDS: Coords = {
  latitude: 49.8951,
  longitude: -97.1384,
};

export const fetchUserLocation = createAsyncThunk<Coords>(
  'userLocation/fetch',
  async () => {
    return new Promise<Coords>((resolve) => {
      if (!navigator.geolocation) {
        return resolve(DEFAULT_COORDS);
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => resolve(DEFAULT_COORDS),
        { timeout: 5000 },
      );
    });
  },
);

const initialState: UserLocationState = {
  coords: DEFAULT_COORDS,
  status: 'idle',
};

const userLocationSlice = createSlice({
  name: 'userLocation',
  initialState,
  reducers: {
    setUserLocation: (state, action: { payload: Coords }) => {
      state.coords = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLocation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserLocation.fulfilled, (state, action) => {
        state.coords = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUserLocation.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setUserLocation } = userLocationSlice.actions;
export default userLocationSlice.reducer;