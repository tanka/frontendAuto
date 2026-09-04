import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/redux';
import { fetchShops } from '@/store/shopSlice';
import { toast } from 'react-toastify';
import { BASE_URL, API_ENDPOINTS } from '@/utils/constants';

interface ShopFormData {
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  website: string;
  imageUrl: string;
  bio: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  establishedYear: number;
  isOpen: boolean;
  lat: string;
  lng: string;
  specialties: string[];
  certifications: string[];
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

const initialFormData: ShopFormData = {
  name: '',
  address: '',
  city: 'Winnipeg',
  province: 'MB',
  postalCode: '',
  phone: '',
  email: '',
  website: '',
  imageUrl: '',
  bio: '',
  rating: 0,
  reviewCount: 0,
  featured: false,
  establishedYear: new Date().getFullYear(),
  isOpen: true,
  lat: '',
  lng: '',
  specialties: [],
  certifications: [],
  hours: {
    monday: '8:00 AM - 6:00 PM',
    tuesday: '8:00 AM - 6:00 PM',
    wednesday: '8:00 AM - 6:00 PM',
    thursday: '8:00 AM - 6:00 PM',
    friday: '8:00 AM - 6:00 PM',
    saturday: '9:00 AM - 3:00 PM',
    sunday: 'Closed',
  },
};

const AddShop: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ShopFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [certificationInput, setCertificationInput] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name.includes('hours.')) {
      const day = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        hours: { ...prev.hours, [day]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSpecialty = () => {
    if (specialtyInput.trim() && !formData.specialties.includes(specialtyInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, specialtyInput.trim()],
      }));
      setSpecialtyInput('');
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== specialty),
    }));
  };

  const handleAddCertification = () => {
    if (certificationInput.trim() && !formData.certifications.includes(certificationInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, certificationInput.trim()],
      }));
      setCertificationInput('');
    }
  };

  const handleRemoveCertification = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c !== cert),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the request body
      const requestBody = {
        id: '',
        ownerId: null,
        name: formData.name,
        category: 'Auto Repair',
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        lat: formData.lat,
        lng: formData.lng,
        phone: formData.phone,
        email: formData.email,
        Website: formData.website,
        ImageUrl: formData.imageUrl,
        Bio: formData.bio,
        Rating: formData.rating,
        ReviewCount: formData.reviewCount,
        Featured: formData.featured,
        EstablishedYear: formData.establishedYear,
        isOpen: formData.isOpen,
        workHours: '',
        bio: formData.bio,
        hours: formData.hours,
        specialties: formData.specialties,
        certifications: formData.certifications,
      };

      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.SHOPS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.isSuccess) {
        toast.success('Shop added successfully!');
        // Refresh the shop list
        await dispatch(fetchShops()).unwrap();
        // Navigate back to home
        navigate('/');
      } else {
        const errorMsg = data.errorMessages?.length > 0 
          ? data.errorMessages[0] 
          : 'Failed to add shop';
        toast.error(errorMsg);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const dayLabels: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">
              <i className="bi bi-plus-circle me-2 text-primary"></i>
              Add New Repair Shop
            </h2>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate('/')}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Shops
            </button>
          </div>

          <form onSubmit={handleSubmit} className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
            <div className="row g-4">
              {/* Basic Information */}
              <div className="col-12">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-info-circle me-2 text-primary"></i>
                  Basic Information
                </h5>
              </div>

              <div className="col-md-6">
                <label htmlFor="name" className="form-label fw-semibold">
                  Shop Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Best Auto Repair"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="phone" className="form-label fw-semibold">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="(204) 555-0123"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="info@shop.com"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="website" className="form-label fw-semibold">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  className="form-control"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://shop.com"
                />
              </div>

              {/* Address Information */}
              <div className="col-12 mt-3">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-geo-alt me-2 text-primary"></i>
                  Location Information
                </h5>
              </div>

              <div className="col-md-8">
                <label htmlFor="address" className="form-label fw-semibold">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="123 Main Street"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="postalCode" className="form-label fw-semibold">
                  Postal Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  className="form-control"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  placeholder="R3C 0A1"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="city" className="form-label fw-semibold">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-control"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Winnipeg"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="province" className="form-label fw-semibold">
                  Province <span className="text-danger">*</span>
                </label>
                <select
                  id="province"
                  name="province"
                  className="form-select"
                  value={formData.province}
                  onChange={handleChange}
                  required
                >
                  <option value="MB">Manitoba</option>
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="ON">Ontario</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="lat" className="form-label fw-semibold">
                  Latitude <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  id="lat"
                  name="lat"
                  className="form-control"
                  value={formData.lat}
                  onChange={handleChange}
                  required
                  step="0.0001"
                  placeholder="49.8951"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="lng" className="form-label fw-semibold">
                  Longitude <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  id="lng"
                  name="lng"
                  className="form-control"
                  value={formData.lng}
                  onChange={handleChange}
                  required
                  step="0.0001"
                  placeholder="-97.1384"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="imageUrl" className="form-label fw-semibold">
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  className="form-control"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Shop Details */}
              <div className="col-12 mt-3">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-tools me-2 text-primary"></i>
                  Shop Details
                </h5>
              </div>

              <div className="col-12">
                <label htmlFor="bio" className="form-label fw-semibold">
                  Description
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  className="form-control"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Describe your shop and services..."
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="rating" className="form-label fw-semibold">
                  Rating
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  className="form-control"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="4.5"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="reviewCount" className="form-label fw-semibold">
                  Review Count
                </label>
                <input
                  type="number"
                  id="reviewCount"
                  name="reviewCount"
                  className="form-control"
                  value={formData.reviewCount}
                  onChange={handleChange}
                  min="0"
                  placeholder="100"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="establishedYear" className="form-label fw-semibold">
                  Established Year
                </label>
                <input
                  type="number"
                  id="establishedYear"
                  name="establishedYear"
                  className="form-control"
                  value={formData.establishedYear}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder="2000"
                />
              </div>

              <div className="col-md-6">
                <div className="form-check form-switch mt-4">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    className="form-check-input"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  <label htmlFor="featured" className="form-check-label fw-semibold">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    Featured Shop
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-check form-switch mt-4">
                  <input
                    type="checkbox"
                    id="isOpen"
                    name="isOpen"
                    className="form-check-input"
                    checked={formData.isOpen}
                    onChange={handleChange}
                  />
                  <label htmlFor="isOpen" className="form-check-label fw-semibold">
                    <i className="bi bi-shop me-1 text-success"></i>
                    Currently Open
                  </label>
                </div>
              </div>

              {/* Specialties */}
              <div className="col-12 mt-3">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-tags me-2 text-primary"></i>
                  Specialties
                </h5>
              </div>

              <div className="col-md-8">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={specialtyInput}
                    onChange={(e) => setSpecialtyInput(e.target.value)}
                    placeholder="Enter a specialty (e.g., Engine Repair)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialty())}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleAddSpecialty}
                  >
                    <i className="bi bi-plus-lg"></i> Add
                  </button>
                </div>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {formData.specialties.map((spec) => (
                    <span key={spec} className="badge bg-primary text-white px-3 py-2 rounded-pill">
                      {spec}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        style={{ fontSize: '0.6rem' }}
                        onClick={() => handleRemoveSpecialty(spec)}
                        aria-label="Remove"
                      />
                    </span>
                  ))}
                  {formData.specialties.length === 0 && (
                    <span className="text-muted small">No specialties added yet</span>
                  )}
                </div>
              </div>

              {/* Certifications */}
              <div className="col-12 mt-3">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-award me-2 text-primary"></i>
                  Certifications
                </h5>
              </div>

              <div className="col-md-8">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={certificationInput}
                    onChange={(e) => setCertificationInput(e.target.value)}
                    placeholder="Enter a certification (e.g., ASE Certified)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={handleAddCertification}
                  >
                    <i className="bi bi-plus-lg"></i> Add
                  </button>
                </div>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {formData.certifications.map((cert) => (
                    <span key={cert} className="badge bg-success text-white px-3 py-2 rounded-pill">
                      <i className="bi bi-check-circle me-1"></i>
                      {cert}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        style={{ fontSize: '0.6rem' }}
                        onClick={() => handleRemoveCertification(cert)}
                        aria-label="Remove"
                      />
                    </span>
                  ))}
                  {formData.certifications.length === 0 && (
                    <span className="text-muted small">No certifications added yet</span>
                  )}
                </div>
              </div>

              {/* Hours of Operation */}
              <div className="col-12 mt-3">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-clock me-2 text-primary"></i>
                  Hours of Operation
                </h5>
              </div>

              {Object.entries(dayLabels).map(([key, label]) => (
                <div key={key} className="col-md-6">
                  <label htmlFor={`hours.${key}`} className="form-label fw-semibold">
                    {label}
                  </label>
                  <input
                    type="text"
                    id={`hours.${key}`}
                    name={`hours.${key}`}
                    className="form-control"
                    value={formData.hours[key as keyof typeof formData.hours]}
                    onChange={handleChange}
                    placeholder="e.g., 9:00 AM - 5:00 PM"
                  />
                </div>
              ))}

              {/* Submit Buttons */}
              <div className="col-12 mt-4">
                <hr />
                <div className="d-flex gap-3 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={() => navigate('/')}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill px-5"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Adding Shop...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Shop
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddShop;