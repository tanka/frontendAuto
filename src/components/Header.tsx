// src/components/Header.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setSearchTerm } from '@/store/shopSlice';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.shops.filters); // getting the current search term read from Redux state (via useAppSelector).
  // so the input is controlled by Redux but stored locally for editing.
  const [localSearch, setLocalSearch] = useState(searchTerm);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();  // 1. Prevent page reload
    dispatch(setSearchTerm(localSearch));  // // 2. Update global search term using App's dispatch.
    navigate(ROUTES.HOME);  // 3. Navigate to home page
  };

  return (
    <header className="bg-dark text-white py-3 shadow-sm">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          <Link to={ROUTES.HOME} className="text-white text-decoration-none d-flex align-items-center gap-2">
            <i className="bi bi-wrench fs-3"></i>
            <span className="fs-4 fw-bold">Auto Repair Compare</span>
          </Link>

          <form onSubmit={handleSearch} className="d-flex flex-grow-1 mx-3" style={{ maxWidth: '500px' }}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search shops, services, or cities..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              aria-label="Search"
            />
            <button type="submit" className="btn btn-primary btn-sm ms-2">
              <i className="bi bi-search"></i>
            </button>
          </form>

          <nav className="d-flex gap-3">
            <Link to={ROUTES.HOME} className="text-white text-decoration-none">
              <i className="bi bi-house"></i> Home
            </Link>
            <Link to={ROUTES.ADD_SHOP} className="btn btn-success btn-sm rounded-pill px-3">
              <i className="bi bi-plus-circle me-1"></i> Add Shop
            </Link>
            <Link to={ROUTES.ABOUT_US} className="text-white text-decoration-none">
              <i className="bi bi-info-circle"></i> About
            </Link>
            <Link to={ROUTES.CONTACT_US} className="text-white text-decoration-none">
              <i className="bi bi-envelope"></i> Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;


// ┌──────────────────────────────────────────────────────────────────┐
// │                         USER TYPES                               │
// │                   "transmission" in input                        │
// └────────────────────────────┬─────────────────────────────────────┘
//                              │
//                              ▼
// ┌──────────────────────────────────────────────────────────────────┐
// │                   localSearch = "transmission"                    │
// │              (input shows text, no Redux update)                  │
// └────────────────────────────┬─────────────────────────────────────┘
//                              │
//                              ▼  (User submits)
// ┌──────────────────────────────────────────────────────────────────┐
// │                     handleSearch()                                │
// │  1. e.preventDefault()                                           │
// │  2. dispatch(setSearchTerm("transmission")) ─────────────────┐   │
// │  3. navigate(ROUTES.HOME)                                     │   │
// └────────────────────────────────────────────────────────────────┘
//                              │                                      │
//                              ▼                                      │
// ┌──────────────────────────────────────────────────────────────────┐
// │                    REDUX STORE UPDATE                            │
// │  filters.searchTerm = "transmission"                             │
// │  filteredShops = filter(shopsData, { searchTerm: "transmission" })│◄─┘
// └────────────────────────────┬─────────────────────────────────────┘
//                              │
//                              ▼
// ┌──────────────────────────────────────────────────────────────────┐
// │              COMPONENTS RE-RENDER WITH NEW DATA                  │
// │  Home → shows only transmission specialists                      │
// │  Shop cards update with filtered results                         │
// └──────────────────────────────────────────────────────────────────┘