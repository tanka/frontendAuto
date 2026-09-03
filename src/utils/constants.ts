export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CART: "/cart",
  CHECKOUT: "/checkout",
  MENU_DETAIL: "/menu/:id",
  ORDER_CONFIRMATION: "/order-confirmation",
  ORDER_MANAGEMENT: "/order-management",
  SHOP_DETAIL: "/shop/:id",
  SHOP_MANAGEMENT: "/management",
  ABOUT_US: "/about",
  CONTACT_US: "/contact",
};

export const ROLES = {
  CUSTOMER: "Customer",
  ADMIN: "Admin",
};

// export const BASE_URL = "https://localhost:7069";
export const BASE_URL =
  "https://auto-comp-backend-g6ckggb3f3hnccfe.canadacentral-01.azurewebsites.net";
export const API_ENDPOINTS = {
  SHOPS: "/api/Shop",
} as const;

export const APP_NAME = "Auto Compare";

export const STORAGE_KEYS = {
  TOKEN: "token-auto-compareapp",
  USER: "user-auto-compareapp",
  STORAGE_KEY_CART: "cart-auto-compareapp",
};

export const CATEGORIES = [
  "Appetizer",
  "Main Course",
  "Desserts",
  "Beverages",
  "Salads",
  "Sides",
  "Entrees",
];

export const ORDER_STATUS = {
  CONFIRMED: "Confirmed",
  READY_FOR_PICKUP: "Ready for Pickup",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const ORDER_STATUS_OPTIONS = [
  {
    value: ORDER_STATUS.CONFIRMED,
    label: ORDER_STATUS.CONFIRMED,
    color: "warning",
  },

  {
    value: ORDER_STATUS.READY_FOR_PICKUP,
    label: ORDER_STATUS.READY_FOR_PICKUP,
    color: "info",
  },

  {
    value: ORDER_STATUS.COMPLETED,
    label: ORDER_STATUS.COMPLETED,
    color: "success",
  },

  {
    value: ORDER_STATUS.CANCELLED,
    label: ORDER_STATUS.CANCELLED,
    color: "danger",
  },
];

export const THEME_KEY_NAME = "bs-theme-himalayan-magic";
