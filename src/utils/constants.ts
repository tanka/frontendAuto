export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CART: "/cart",
  CHECKOUT: "/checkout",
  MENU_DETAIL: "/menu/:id",
  ORDER_CONFIRMATION: "/order-confirmation",
  ORDER_MANAGEMENT: "/order-management",
  SHOP_DETAIL: '/shop/:id',
  SHOP_MANAGEMENT: '/management',
  ABOUT_US: '/about',
  CONTACT_US: '/contact',
};

export const ROLES = {
  CUSTOMER: "Customer",
  ADMIN: "Admin",
};

export const API_BASE_URL = "https://localhost:7069";
// export const API_BASE_URL = "https://bhattarai-001-site1.site4future.com";

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