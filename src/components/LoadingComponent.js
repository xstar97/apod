import React from 'react';
import './Loading.css'; // we'll define shimmer styles here

const LoadingComponent = () => {
  return (
    <div id="image-container" style={{ margin: '20px' }}>
      {/* Title skeleton */}
      <div className="skeleton" style={{ width: '60%', height: '24px', marginBottom: '10px' }}></div>

      {/* Date skeleton */}
      <div className="skeleton" style={{ width: '30%', height: '16px', marginBottom: '10px' }}></div>

      {/* Copyright skeleton */}
      <div className="skeleton" style={{ width: '40%', height: '16px', marginBottom: '20px' }}></div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Media skeleton */}
        <div className="skeleton" style={{ width: '512px', height: '512px', margin: '10px', borderRadius: '8px' }}></div>

        {/* Description skeleton */}
        <div
          style={{
            width: '512px',
            margin: '10px',
            padding: '10px',
            border: '1px solid #ccc',
          }}
        >
          <div className="skeleton" style={{ width: '100%', height: '16px', marginBottom: '8px' }}></div>
          <div className="skeleton" style={{ width: '90%', height: '16px', marginBottom: '8px' }}></div>
          <div className="skeleton" style={{ width: '80%', height: '16px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
