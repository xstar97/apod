import React from 'react';

const ApodComponent = ({ data }) => (
  <div id="image-container">
    <h1 id="gallery-title">{data.title}</h1>
    <p id="gallery-date">{data.date}</p>
    {data.copyright && (
      <p id="gallery-copyright">Copyright: {data.copyright}</p>
    )}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img id="gallery-image" src={data.hdurl} alt="" style={{ width: '512px', height: '512px' }} />
      <div id="description-container" style={{ width: '512px' }}>
        <p id="full-description">{data.explanation}</p>
      </div>
    </div>
  </div>
);

export default ApodComponent;
