import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'restaurant',
    organizationName: '',
    contactNumber: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    
    const { confirmPassword, ...registerData } = formData;
    const success = await onRegister(registerData);
    if (!success) {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-logo-wrap">
        <img src={require('../../images/logo.png')} alt="Logo" className="form-logo" />
      </div>
      <h2 className="form-title">Join Greenbite</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="userType">
            Account Type
          </label>
          <select
            id="userType"
            name="userType"
            className="form-select"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="restaurant">Restaurant/Caterer</option>
            <option value="ngo">NGO</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="organizationName">
            {formData.userType === 'restaurant' ? 'Restaurant/Caterer Name' : 'NGO Name'}
          </label>
          <input
            type="text"
            id="organizationName"
            name="organizationName"
            className="form-input"
            value={formData.organizationName}
            onChange={handleChange}
            required
            placeholder={`Enter ${formData.userType === 'restaurant' ? 'restaurant' : 'NGO'} name`}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="contactNumber">
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            className="form-input"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            placeholder="Enter contact number"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            className="form-input"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter complete address"
            rows="3"
            style={{ resize: 'vertical' }}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter password (min 6 characters)"
            minLength="6"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      
      <div className="text-center mt-20">
        <p className="text-muted">
          Already have an account?{' '}
          <Link to="/login" className="link">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register; 