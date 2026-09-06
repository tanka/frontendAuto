// src/AppRouter.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/constants";
import Home from "@/pages/Home";
import ShopDetail from "@/pages/ShopDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AddShop from "./pages/AddShop";
// import AddShop from "@/pages/Addshop";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.SHOP_DETAIL} element={<ShopDetail />} />
      <Route path={ROUTES.ABOUT_US} element={<About />} />
      <Route path={ROUTES.CONTACT_US} element={<Contact />} />
      <Route path="*" element={<Home />} />
      <Route path={ROUTES.ADD_SHOP} element={<AddShop />} />
    </Routes>
  );
};

export default AppRouter;
