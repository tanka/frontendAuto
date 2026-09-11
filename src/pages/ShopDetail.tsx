// src/pages/ShopDetail.tsx

import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { selectShop, clearSelectedShop } from "@/store/shopSlice";
import { useEffect } from "react";
import { ROUTES } from "../utils/constants";
import { calculateDistance, formatDistance } from "@/utils/distance";

const ShopDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedShop } = useAppSelector((state) => state.shops);
  const userLocation = useAppSelector((state) => state.userLocation.coords);

  useEffect(() => {
    if (id) {
      dispatch(selectShop(id));
    }
    return () => {
      dispatch(clearSelectedShop());
    };
  }, [id, dispatch]);

  if (!selectedShop) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <i className="bi bi-shop display-1 text-muted"></i>
          <h3 className="mt-3">Shop not found</h3>
          <p className="text-secondary">
            The shop you're looking for doesn't exist or has been removed.
          </p>
          <Link to={ROUTES.HOME} className="btn btn-primary mt-3">
            <i className="bi bi-arrow-left me-2"></i> Back to shops
          </Link>
        </div>
      </div>
    );
  }

  const {
    id: shopId,
    name,
    imageUrl,
    // address,
    city,
    state,
    zip,
    phone,
    email,
    website,
    rating,
    reviewCount,
    specialties,
    description,
    hours,
    establishedYear,
    certifications,
    coordinates,
  } = selectedShop;

  const distance = calculateDistance(
    userLocation.latitude,
    userLocation.longitude,
    coordinates.lat,
    coordinates.lng,
  );
  const formattedDistance = formatDistance(distance);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>,
      );
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="bi bi-star text-warning"></i>,
      );
    }
    return stars;
  };

  const dayNames: Record<string, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-2"></i> Back
        </button>
        <div className="d-flex gap-2">
          {/* 👇 NEW: Edit Shop Button */}
          <button
            className="btn btn-primary btn-sm rounded-pill px-4"
            onClick={() => navigate(ROUTES.EDIT_SHOP.replace(":id", shopId))}
          >
            <i className="bi bi-pencil-square me-2"></i>
            Edit Shop
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <img
              src={
                imageUrl ||
                "https://via.placeholder.com/800x350/cccccc/666666?text=No+Image"
              }
              alt={name}
              className="w-100"
              style={{ height: "350px", objectFit: "cover" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://via.placeholder.com/800x350/cccccc/666666?text=No+Image";
              }}
            />
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                <h2 className="fw-bold mb-0">{name}</h2>
                <div className="d-flex align-items-center bg-light px-3 py-2 rounded-3">
                  <span className="fw-bold me-2 fs-5">
                    {rating?.toFixed(1) || "N/A"}
                  </span>
                  {rating > 0 ? (
                    renderStars(rating)
                  ) : (
                    <span className="text-muted small">No ratings</span>
                  )}
                  <span className="ms-2 text-secondary small">
                    ({reviewCount || 0} reviews)
                  </span>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">
                  <i className="bi bi-geo-alt me-1"></i> {city}, {state} {zip}
                </span>
                <span className="badge bg-info bg-opacity-10 text-info px-3 py-2 rounded-pill">
                  <i className="bi bi-pin-map me-1"></i> {formattedDistance}{" "}
                  from you
                </span>
                {establishedYear && (
                  <span className="badge bg-info bg-opacity-10 text-info px-3 py-2 rounded-pill">
                    <i className="bi bi-calendar3 me-1"></i> Est.{" "}
                    {establishedYear}
                  </span>
                )}
              </div>

              <p className="text-secondary mb-4">
                {description || "No description available."}
              </p>

              <div className="mb-4">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-tools me-2 text-primary"></i>Specialties
                </h5>
                {specialties && specialties.length > 0 ? (
                  <div className="d-flex flex-wrap gap-2">
                    {specialties.map((spec, index) => (
                      <span
                        key={index}
                        className="badge bg-primary text-white px-3 py-2 rounded-pill"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted small">No specialties listed</p>
                )}
              </div>

              {certifications && certifications.length > 0 && (
                <div className="mb-4">
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-award me-2 text-primary"></i>
                    Certifications
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill border border-warning border-opacity-25"
                      >
                        <i className="bi bi-check-circle me-1"></i> {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="card border-0 shadow-sm rounded-4 overflow-hidden sticky-top"
            style={{ top: "20px" }}
          >
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">
                <i className="bi bi-info-circle me-2 text-primary"></i>Contact &
                Hours
              </h5>

              <div className="mb-3">
                <div className="d-flex align-items-start gap-2 mb-2">
                  <i className="bi bi-telephone text-primary mt-1"></i>
                  <div>
                    <div className="fw-semibold small text-secondary">
                      Phone
                    </div>
                    <a href={`tel:${phone}`} className="text-decoration-none">
                      {phone}
                    </a>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-2 mb-2">
                  <i className="bi bi-envelope text-primary mt-1"></i>
                  <div>
                    <div className="fw-semibold small text-secondary">
                      Email
                    </div>
                    <a
                      href={`mailto:${email}`}
                      className="text-decoration-none text-break"
                    >
                      {email}
                    </a>
                  </div>
                </div>
                {website && (
                  <div className="d-flex align-items-start gap-2">
                    <i className="bi bi-globe text-primary mt-1"></i>
                    <div>
                      <div className="fw-semibold small text-secondary">
                        Website
                      </div>
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                      >
                        {website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <hr />

              <div className="mb-3">
                <h6 className="fw-bold mb-2">
                  <i className="bi bi-clock me-2 text-primary"></i>Hours of
                  Operation
                </h6>
                {Object.entries(hours).map(([key, value]) => (
                  <div
                    key={key}
                    className="d-flex justify-content-between small py-1 border-bottom border-light"
                  >
                    <span className="text-secondary">{dayNames[key]}</span>
                    <span
                      className={
                        value === "Closed" ? "text-danger fw-semibold" : ""
                      }
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <hr />

              <div className="d-grid gap-2">
                <button className="btn btn-primary rounded-pill py-2">
                  <i className="bi bi-telephone me-2"></i> Call Now
                </button>
                <button className="btn btn-outline-secondary rounded-pill py-2">
                  <i className="bi bi-send me-2"></i> Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
