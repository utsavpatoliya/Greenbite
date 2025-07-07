const express = require('express');
const { body, validationResult } = require('express-validator');
const Food = require('../models/Food');
const { auth, requireUserType } = require('../middleware/auth');

const router = express.Router();

// Test route to confirm food router works
router.get('/test', (req, res) => {
  res.send('Food API test route working!');
});

// Create food post (Restaurant only)
router.post('/', [
  auth,
  requireUserType('restaurant'),
  body('foodType').notEmpty().trim(),
  body('quantity').notEmpty().trim(),
  body('address').notEmpty().trim(),
  body('contactNumber').notEmpty(),
  body('expiryTime').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { foodType, quantity, address, contactNumber, expiryTime } = req.body;

    const food = new Food({
      restaurant: req.user._id,
      foodType,
      quantity,
      address,
      contactNumber,
      expiryTime: new Date(expiryTime)
    });

    await food.save();

    res.status(201).json({
      message: 'Food post created successfully',
      food
    });
  } catch (error) {
    console.error('Create food error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all food posts
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.userType === 'restaurant') {
      query.restaurant = req.user._id;
    }

    const foods = await Food.find(query)
      .populate('restaurant', 'organizationName email contactNumber address')
      .populate('ngoResponse.ngo', 'organizationName')
      .sort({ createdAt: -1 });

    res.json(foods);
  } catch (error) {
    console.error('Get foods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get food post by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id)
      .populate('restaurant', 'organizationName email contactNumber address')
      .populate('ngoResponse.ngo', 'organizationName');

    if (!food) return res.status(404).json({ message: 'Food post not found' });

    if (req.user.userType === 'restaurant' && food.restaurant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(food);
  } catch (error) {
    console.error('Get food error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update food status (NGO only)
router.patch('/:id/status', [
  auth,
  requireUserType('ngo'),
  body('status').isIn(['accepted', 'rejected']),
  body('notes').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, notes } = req.body;
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food post not found' });

    if (food.status !== 'pending') {
      return res.status(400).json({ message: 'Food post has already been processed' });
    }

    food.status = status;
    food.ngoResponse = {
      ngo: req.user._id,
      responseTime: new Date(),
      notes: notes || ''
    };

    await food.save();

    res.json({
      message: `Food post ${status} successfully`,
      food
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete food post (Restaurant only)
router.delete('/:id', [auth, requireUserType('restaurant')], async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food post not found' });

    if (food.restaurant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (food.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot delete processed food post' });
    }

    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food post deleted successfully' });
  } catch (error) {
    console.error('Delete food error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
