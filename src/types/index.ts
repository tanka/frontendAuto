// src/types/index.ts

export interface Shop {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  description: string;
  imageUrl: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  featured?: boolean;
  establishedYear?: number;
  certifications?: string[];
}

export interface ShopFilters {
  searchTerm: string;
  specialty: string;
  minRating: number;
  city: string;
}

export interface RootState {
  shops: ShopState;
  userLocation: UserLocationState;
}

export interface ShopState {
  shops: Shop[];
  filteredShops: Shop[];
  selectedShop: Shop | null;
  loading: boolean;
  error: string | null;
  filters: ShopFilters;
}

export interface UserLocationState {
  coords: {
    latitude: number;
    longitude: number;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}