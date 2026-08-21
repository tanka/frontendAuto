// src/components/ShopCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { type Shop } from '@/types';
import { useAppSelector } from '@/hooks/redux';
import { calculateDistance, formatDistance } from '@/utils/distance';

interface ShopCardProps {
  shop: Shop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const { id, name, imageUrl, rating, reviewCount, specialties, city, state, description, featured, coordinates } = shop;
  const userLocation = useAppSelector((state) => state.userLocation.coords);

  const distance = calculateDistance(
    userLocation.latitude,
    userLocation.longitude,
    coordinates.lat,
    coordinates.lng
  );
  const formattedDistance = formatDistance(distance);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-warning"></i>);
    }
    return stars;
  };

  return (
    <div className="card h-100 shadow-sm hover-shadow transition-all border-0 rounded-4 overflow-hidden">
      <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
        <img
          src={imageUrl}
          alt={name}
          className="w-100 h-100 object-fit-cover"
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />
        {featured && (
          <span className="position-absolute top-0 end-0 m-2 badge bg-warning text-dark px-3 py-2 rounded-pill">
            <i className="bi bi-star-fill me-1"></i> Featured
          </span>
        )}
        <span className="position-absolute bottom-0 start-0 m-2 badge bg-primary bg-opacity-75 text-white px-3 py-2 rounded-pill">
          <i className="bi bi-geo-alt me-1"></i> {formattedDistance}
        </span>
      </div>

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title fw-bold mb-0 text-truncate" style={{ maxWidth: '70%' }}>
            {name}
          </h5>
          <div className="d-flex align-items-center bg-light px-2 py-1 rounded">
            <span className="fw-bold me-1">{rating.toFixed(1)}</span>
            {renderStars(rating)}
          </div>
        </div>

        <div className="d-flex align-items-center text-muted small mb-2">
          <i className="bi bi-geo-alt me-1"></i>
          <span>{city}, {state}</span>
        </div>

        <p className="card-text text-secondary small mb-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {description}
        </p>

        <div className="d-flex flex-wrap gap-1 mb-3">
          {specialties.slice(0, 3).map((spec, index) => (
            <span key={index} className="badge bg-primary bg-opacity-10 text-primary small px-2 py-1 rounded-pill">
              {spec}
            </span>
          ))}
          {specialties.length > 3 && (
            <span className="badge bg-secondary bg-opacity-10 text-secondary small px-2 py-1 rounded-pill">
              +{specialties.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div className="text-muted small">
            <i className="bi bi-chat me-1"></i> {reviewCount} reviews
          </div>
          <Link to={`/shop/${id}`} className="btn btn-primary btn-sm rounded-pill px-4">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;