// src/components/Header.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setSearchTerm } from '@/store/shopSlice';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.shops.filters);
  const [localSearch, setLocalSearch] = useState(searchTerm);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearch));
    navigate(ROUTES.HOME);
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