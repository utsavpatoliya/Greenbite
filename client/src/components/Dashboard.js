import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import FoodCard from './FoodCard';
import FoodForm from './FoodForm';

const Dashboard = ({ user }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFoodForm, setShowFoodForm] = useState(false);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get('/api/food');
      setFoods(response.data);
    } catch (error) {
      toast.error('Failed to fetch food posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFood = async (foodData) => {
    try {
      await axios.post('/api/food', foodData);
      toast.success('Food post created successfully!');
      setShowFoodForm(false);
      fetchFoods();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create food post');
    }
  };

  const handleStatusUpdate = async (foodId, status, notes = '') => {
    try {
      await axios.patch(`/api/food/${foodId}/status`, { status, notes });
      toast.success(`Food post ${status} successfully!`);
      fetchFoods();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDeleteFood = async (foodId) => {
    if (window.confirm('Are you sure you want to delete this food post?')) {
      try {
        await axios.delete(`/api/food/${foodId}`);
        toast.success('Food post deleted successfully!');
        fetchFoods();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete food post');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="form-logo-wrap">
        <img src={require('../images/logo.png')} alt="Logo" className="form-logo" />
      </div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Welcome to Greenbite, {user.organizationName}!
        </h1>
        <p className="dashboard-subtitle">
          {user.userType === 'restaurant' 
            ? 'Manage your food donations and track their status'
            : 'Browse available food donations and help reduce waste'
          }
        </p>
      </div>

      <div className="grid">
        {foods.length === 0 ? (
          <div className="text-center">
            <p className="text-muted">
              {user.userType === 'restaurant' 
                ? 'No food donations yet. Create your first one!'
                : 'No food donations available at the moment.'
              }
            </p>
          </div>
        ) : (
          foods.map(food => (
            <FoodCard
              key={food._id}
              food={food}
              userType={user.userType}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDeleteFood}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard; 