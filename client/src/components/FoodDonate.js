import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import FoodForm from './FoodForm';

const FoodDonate = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateFood = async (foodData) => {
    setLoading(true);
    try {
      await axios.post('/api/food', foodData);
      toast.success('Food post created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create food post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-logo-wrap">
        <img src={require('../images/logo.png')} alt="Logo" className="form-logo" />
      </div>
      <h2 className="form-title text-center mb-20">Donate Food - Greenbite</h2>
      <FoodForm onSubmit={handleCreateFood} onCancel={() => navigate('/dashboard')} loading={loading} />
    </div>
  );
};

export default FoodDonate; 