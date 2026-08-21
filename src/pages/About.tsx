// src/pages/About.tsx

import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <i className="bi bi-wrench display-1 text-primary"></i>
            <h1 className="fw-bold mt-3">About RepairFinder</h1>
            <p className="text-secondary lead">
              Your trusted platform for finding quality auto repair shops in Winnipeg
            </p>
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex gap-3">
                  <i className="bi bi-search fs-2 text-primary"></i>
                  <div>
                    <h5 className="fw-bold">Find Shops</h5>
                    <p className="text-secondary small">
                      Search through our curated list of trusted repair shops in the Winnipeg area.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex gap-3">
                  <i className="bi bi-star fs-2 text-warning"></i>
                  <div>
                    <h5 className="fw-bold">Read Reviews</h5>
                    <p className="text-secondary small">
                      Make informed decisions with authentic customer reviews and ratings.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex gap-3">
                  <i className="bi bi-tools fs-2 text-success"></i>
                  <div>
                    <h5 className="fw-bold">Expert Services</h5>
                    <p className="text-secondary small">
                      Find specialists for everything from oil changes to complex diagnostics.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex gap-3">
                  <i className="bi bi-shield-check fs-2 text-info"></i>
                  <div>
                    <h5 className="fw-bold">Verified Shops</h5>
                    <p className="text-secondary small">
                      All shops are verified and meet our quality standards for service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center text-secondary small">
            <p>
              <i className="bi bi-info-circle me-1"></i>
              RepairFinder is a platform for discovering auto repair shops in Winnipeg. We are not affiliated with any repair shop listed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;