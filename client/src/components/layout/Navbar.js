import React from 'react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar enhanced-navbar">
      <div className="nav-container">
        <a href="/dashboard" className="nav-brand enhanced-nav-brand">
          <img src={require('../../images/logo.png')} alt="Logo" className="nav-img-logo" />
          <span className="brand-title">Greenbite</span>
        </a>
        <div className="nav-links">
          <a href="/dashboard" className="nav-link">Dashboard</a>
          <a href="/gallery" className="nav-link">Gallery</a>
          {user.userType === 'restaurant' && (
            <a href="/food-donate" className="nav-link">Food Donate</a>
          )}
        </div>
        <div className="nav-user">
          <div className="nav-user-info">
            <div className="nav-user-name">{user.organizationName}</div>
            <div className="nav-user-type">{user.userType}</div>
          </div>
          <button onClick={onLogout} className="nav-logout enhanced-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 