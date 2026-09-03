// src/pages/Home.tsx

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { fetchUserLocation } from "@/store/userLocationSlice";
import ShopCard from "@/components/ShopCard";
import FilterSidebar from "@/components/FilterSidebar";
import { fetchShops } from "@/store/shopSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredShops, loading, error, shops } = useAppSelector(
    (state) => state.shops,
  );
  const userLocationStatus = useAppSelector(
    (state) => state.userLocation.status,
  );

  // Fetch shops if not already loaded
  useEffect(() => {
    if (shops.length === 0 && !loading) {
      dispatch(fetchShops());
    }
  }, [shops.length, loading, dispatch]);

  // Fetch user location on mount
  useEffect(() => {
    if (userLocationStatus === "idle") {
      dispatch(fetchUserLocation());
    }
  }, [userLocationStatus, dispatch]);

  if (loading) {
    return (
      <div className="container py-5">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div className="text-center">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-secondary">Loading repair shops...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Sidebar with filters */}
        <div className="col-lg-3">
          <FilterSidebar />
        </div>
        {/* Sidebar with filters ------End ------- */}
        {/* Main content - shop listings */}
        <div className="col-lg-9">
          {/* Number of shops found text */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">
              <i className="bi bi-shop me-2 text-primary"></i>
              {filteredShops.length} Shop{filteredShops.length !== 1 ? "s" : ""}{" "}
              Found
            </h4>
            {filteredShops.length === 0 && (
              <span className="text-muted small">
                Try adjusting your filters
              </span>
            )}
          </div>
          {/* Number of shops found text ---- End ----- */}

          {/* List the shops found */}
          {filteredShops.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-search display-1 text-muted"></i>
              <h3 className="mt-3">No shops found</h3>
              <p className="text-secondary">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredShops.map((shop) => (
                <div key={shop.id} className="col-md-6 col-xl-4">
                  <ShopCard shop={shop} />
                </div>
              ))}
            </div>
          )}

          {/* List the shops found ---- End ----- */}
        </div>

        {/* Main content - shop listings-------- End --------- */}
      </div>
    </div>
  );
};

export default Home;
