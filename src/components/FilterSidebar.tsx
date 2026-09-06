// src/components/FilterSidebar.tsx

import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSpecialty, setMinRating, clearFilters } from "@/store/shopSlice";
import { shopsData } from "@/data/shops";

const FilterSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters, shops } = useAppSelector((state) => state.shops);

  // Get unique specialties from all shops
  const allSpecialties = Array.from(
    new Set(shopsData.flatMap((shop) => shop.specialties)),
  ).sort();

  // Get unique cities
  // const allCities = Array.from(
  //   new Set(shopsData.map((shop) => shop.city)),
  // ).sort();

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSpecialty(e.target.value));
  };

  // const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   dispatch(setCity(e.target.value));
  // };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMinRating(Number(e.target.value)));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters =
    filters.searchTerm ||
    filters.specialty ||
    filters.minRating > 0 ||
    filters.city;

  return (
    <div className="bg-light p-4 rounded-4 sticky-top" style={{ top: "20px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">
          <i className="bi bi-filters me-2"></i>Filters
        </h5>
        {hasActiveFilters && (
          <button
            className="btn btn-link btn-sm text-danger p-0"
            onClick={handleClearFilters}
          >
            <i className="bi bi-eraser me-1"></i> Clear all
          </button>
        )}
      </div>

      <div className="mb-3">
        <label
          htmlFor="specialty-filter"
          className="form-label fw-semibold small text-secondary"
        >
          <i className="bi bi-tools me-1"></i> Specialty
        </label>
        <select
          id="specialty-filter"
          className="form-select form-select-sm"
          value={filters.specialty}
          onChange={handleSpecialtyChange}
        >
          <option value="">All Specialties</option>
          {allSpecialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* <div className="mb-3">
        <label htmlFor="city-filter" className="form-label fw-semibold small text-secondary">
          <i className="bi bi-building me-1"></i> City
        </label>
        <select
          id="city-filter"
          className="form-select form-select-sm"
          value={filters.city}
          onChange={handleCityChange}
        >
          <option value="">All Cities</option>
          {allCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div> */}

      <div className="mb-3">
        <label
          htmlFor="rating-filter"
          className="form-label fw-semibold small text-secondary"
        >
          <i className="bi bi-star me-1"></i> Minimum Rating
        </label>
        <select
          id="rating-filter"
          className="form-select form-select-sm"
          value={filters.minRating}
          onChange={handleRatingChange}
        >
          <option value={0}>Any Rating</option>
          <option value={4.5}>4.5 &amp; above</option>
          <option value={4.0}>4.0 &amp; above</option>
          <option value={3.5}>3.5 &amp; above</option>
          <option value={3.0}>3.0 &amp; above</option>
        </select>
      </div>

      <div className="mt-4 pt-3 border-top">
        <div className="d-flex justify-content-between text-secondary small">
          <span>
            <i className="bi bi-shop me-1"></i>
            {shops.length} total shops
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
