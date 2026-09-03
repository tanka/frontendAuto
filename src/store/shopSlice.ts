import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type Shop, type ShopFilters, type ShopState } from "@/types";
import { BASE_URL, API_ENDPOINTS } from "@/utils/constants";

// Remove the static data import
// import { shopsData } from '@/data/shops';

// Define the API response shape
interface ApiResponse {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: string[];
  result: Shop[];
}

const initialState: ShopState = {
  shops: [],
  filteredShops: [],
  selectedShop: null,
  loading: false, // start loading to fetch on mount
  error: null,
  filters: {
    searchTerm: "",
    specialty: "",
    minRating: 0,
    city: "",
  },
};

// Async thunk to fetch shops from the API
export const fetchShops = createAsyncThunk(
  "shops/fetchShops",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${BASE_URL}${API_ENDPOINTS.SHOPS}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (!data.isSuccess) {
        // Use the first error message from the API, or a fallback
        const errorMsg =
          data.errorMessages?.length > 0
            ? data.errorMessages[0]
            : "Failed to fetch shops";
        return rejectWithValue(errorMsg);
      }

      // The API returns shops in data.result
      return data.result;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

const shopSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    // ... (all existing reducers remain unchanged) ...
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
      state.filteredShops = applyFilters(state.shops, state.filters);
    },
    setSpecialty: (state, action: PayloadAction<string>) => {
      state.filters.specialty = action.payload;
      state.filteredShops = applyFilters(state.shops, state.filters);
    },
    setMinRating: (state, action: PayloadAction<number>) => {
      state.filters.minRating = action.payload;
      state.filteredShops = applyFilters(state.shops, state.filters);
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.filters.city = action.payload;
      state.filteredShops = applyFilters(state.shops, state.filters);
    },
    clearFilters: (state) => {
      state.filters = {
        searchTerm: "",
        specialty: "",
        minRating: 0,
        city: "",
      };
      state.filteredShops = state.shops;
    },
    selectShop: (state, action: PayloadAction<string>) => {
      const shop = state.shops.find((s) => s.id === action.payload);
      state.selectedShop = shop || null;
    },
    clearSelectedShop: (state) => {
      state.selectedShop = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = action.payload;
        state.filteredShops = applyFilters(action.payload, state.filters);
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch shops";
        // Optionally clear shops on error
        state.shops = [];
        state.filteredShops = [];
      });
  },
});

// Helper function (unchanged)
function applyFilters(shops: Shop[], filters: ShopFilters): Shop[] {
  let result = [...shops];
  const { searchTerm, specialty, minRating, city } = filters;

  if (searchTerm.trim()) {
    const term = searchTerm.trim().toLowerCase();
    result = result.filter(
      (shop) =>
        shop.name.toLowerCase().includes(term) ||
        shop.description.toLowerCase().includes(term) ||
        shop.address.toLowerCase().includes(term) ||
        shop.city.toLowerCase().includes(term) ||
        shop.specialties.some((s) => s.toLowerCase().includes(term)),
    );
  }

  if (specialty) {
    result = result.filter((shop) =>
      shop.specialties.some((s) =>
        s.toLowerCase().includes(specialty.toLowerCase()),
      ),
    );
  }

  if (minRating > 0) {
    result = result.filter((shop) => shop.rating >= minRating);
  }

  if (city.trim()) {
    const cityLower = city.trim().toLowerCase();
    result = result.filter((shop) =>
      shop.city.toLowerCase().includes(cityLower),
    );
  }

  return result;
}

export const {
  setSearchTerm,
  setSpecialty,
  setMinRating,
  setCity,
  clearFilters,
  selectShop,
  clearSelectedShop,
} = shopSlice.actions;

export default shopSlice.reducer;
