// src/pages/Contact.tsx

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <i className="bi bi-envelope display-1 text-primary"></i>
            <h1 className="fw-bold mt-3">Contact Us</h1>
            <p className="text-secondary lead">
              Have questions or feedback about repair shops in Winnipeg? We'd love to hear from you.
            </p>
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="subject" className="form-label fw-semibold">
                    Subject <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="message" className="form-label fw-semibold">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    rows={5}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 rounded-pill py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2"></i> Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-md-4 text-center">
              <div className="bg-light rounded-4 p-3">
                <i className="bi bi-geo-alt fs-2 text-primary"></i>
                <h6 className="fw-bold mt-2">Visit Us</h6>
                <p className="text-secondary small mb-0">123 Main Street<br />Winnipeg, MB R3C 0A1</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="bg-light rounded-4 p-3">
                <i className="bi bi-telephone fs-2 text-primary"></i>
                <h6 className="fw-bold mt-2">Call Us</h6>
                <p className="text-secondary small mb-0">(204) 555-0123<br />Mon-Fri 8am-6pm</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="bg-light rounded-4 p-3">
                <i className="bi bi-envelope fs-2 text-primary"></i>
                <h6 className="fw-bold mt-2">Email Us</h6>
                <p className="text-secondary small mb-0">support@repairfinder.com<br />24/7 Response</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;