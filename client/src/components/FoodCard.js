import React, { useState } from 'react';

const FoodCard = ({ food, userType, onStatusUpdate, onDelete }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'accepted': return 'status-accepted';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  const handleStatusUpdate = async (status) => {
    if (status === 'accepted' || status === 'rejected') {
      setShowNotes(true);
      return;
    }
    
    setLoading(true);
    await onStatusUpdate(food._id, status, notes);
    setLoading(false);
    setShowNotes(false);
    setNotes('');
  };

  const confirmStatusUpdate = async (status) => {
    setLoading(true);
    await onStatusUpdate(food._id, status, notes);
    setLoading(false);
    setShowNotes(false);
    setNotes('');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{food.foodType}</h3>
        <span className={`card-status ${getStatusColor(food.status)}`}>
          {food.status}
        </span>
      </div>

      <div className="food-details">
        <p><strong>Quantity:</strong> {food.quantity}</p>
        <p><strong>Address:</strong> {food.address}</p>
        <p><strong>Contact:</strong> {food.contactNumber}</p>
        <p><strong>Expires:</strong> {formatDate(food.expiryTime)}</p>
        <p><strong>Posted by:</strong> {food.restaurant?.organizationName}</p>
        <p><strong>Posted on:</strong> {formatDate(food.createdAt)}</p>
        
        {food.ngoResponse?.ngo && (
          <div className="ngo-response">
            <p><strong>Responded by:</strong> {food.ngoResponse.ngo.organizationName}</p>
            <p><strong>Response time:</strong> {formatDate(food.ngoResponse.responseTime)}</p>
            {food.ngoResponse.notes && (
              <p><strong>Notes:</strong> {food.ngoResponse.notes}</p>
            )}
          </div>
        )}
      </div>

      {userType === 'ngo' && food.status === 'pending' && (
        <div className="card-actions">
          {!showNotes ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn btn-success"
                onClick={() => handleStatusUpdate('accepted')}
                disabled={loading}
                style={{ flex: 1 }}
              >
                Accept
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleStatusUpdate('rejected')}
                disabled={loading}
                style={{ flex: 1 }}
              >
                Reject
              </button>
            </div>
          ) : (
            <div>
              <textarea
                className="form-input"
                placeholder="Add notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
                style={{ marginBottom: '10px' }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-success"
                  onClick={() => confirmStatusUpdate('accepted')}
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  Confirm Accept
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => confirmStatusUpdate('rejected')}
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  Confirm Reject
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowNotes(false)}
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {userType === 'restaurant' && food.status === 'pending' && (
        <div className="card-actions">
          <button 
            className="btn btn-danger"
            onClick={() => onDelete(food._id)}
            disabled={loading}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodCard; 