import React from 'react';

const sampleImages = [
  require('../images/1.png'),
  require('../images/2.png'),
  require('../images/3.png'),
  require('../images/4.png'),
  require('../images/5.png'),
  require('../images/6.png'),
  require('../images/7.png'),
  require('../images/8.png'),
  require('../images/9.png'),
];

const Gallery = () => {
  return (
    <div>
      <div className="form-logo-wrap">
        <img src={require('../images/logo.png')} alt="Logo" className="form-logo" />
      </div>
      <h2 className="form-title text-center mb-20">Greenbite Gallery</h2>
      <div className="gallery-grid">
        {sampleImages.map((src, idx) => (
          <div className="gallery-item" key={idx}>
            <img src={src} alt={`Gallery ${idx + 1}`} className="gallery-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery; 