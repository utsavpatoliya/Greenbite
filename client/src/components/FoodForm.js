import React, { useState } from 'react';

const FoodForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    address: '',
    contactNumber: '',
    expiryTime: ''
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
    setLoading(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      setLoading(false);
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Minimum 30 minutes from now
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="food-form">
      <h2 className="form-title">Add Food Donation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="foodType">
            Food Type
          </label>
          <input
            type="text"
            id="foodType"
            name="foodType"
            className="form-input"
            value={formData.foodType}
            onChange={handleChange}
            required
            placeholder="e.g., Rice, Bread, Vegetables, etc."
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            className="form-input"
            value={formData.quantity}
            onChange={handleChange}
            required
            placeholder="e.g., 10 kg, 50 pieces, etc."
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="address">
            Pickup Address
          </label>
          <textarea
            id="address"
            name="address"
            className="form-input"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter complete pickup address"
            rows="3"
            style={{ resize: 'vertical' }}
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
            placeholder="Enter contact number for pickup"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="expiryTime">
            Expiry Time
          </label>
          <input
            type="datetime-local"
            id="expiryTime"
            name="expiryTime"
            className="form-input"
            value={formData.expiryTime}
            onChange={handleChange}
            required
            min={getMinDateTime()}
          />
          <small className="text-muted">
            Set when the food will expire (minimum 30 minutes from now)
          </small>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ flex: 1 }}
          >
            {loading ? 'Creating...' : 'Create Food Post'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
            style={{ flex: 1 }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodForm; 