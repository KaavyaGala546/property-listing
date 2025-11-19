const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

const router = express.Router();

// Helper: load sample data file
function loadSampleProperties() {
  try {
    const file = path.join(__dirname, '..', 'data', 'properties.json');
    const raw = fs.readFileSync(file, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

// GET /api/cart - Get user's saved properties
router.get('/', auth, async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.userId })
      .sort({ addedAt: -1 })
      .lean();
    
    // Populate property data - try DB first, then fall back to sample data
    const sampleProperties = loadSampleProperties();
    const populatedItems = [];
    
    for (const item of items) {
      let property = null;
      
      // Try to find in DB if it looks like a valid 24-char ObjectId
      if (String(item.propertyId).match(/^[0-9a-fA-F]{24}$/)) {
        try {
          property = await Property.findById(item.propertyId).lean();
        } catch (err) {
          // Not a valid ObjectId, will try sample data
        }
      }
      
      // If not in DB, try to find in sample data
      if (!property) {
        property = sampleProperties.find(p => String(p.id) === String(item.propertyId));
      }
      
      if (property) {
        populatedItems.push({
          _id: item._id,
          userId: item.userId,
          addedAt: item.addedAt,
          propertyId: property
        });
      }
    }
    
    res.json(populatedItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/cart - Add property to cart (works with numeric IDs from sample data)
router.post('/', auth, async (req, res) => {
  try {
    const { propertyId } = req.body;
    if (!propertyId) return res.status(400).json({ message: 'Property ID required' });

    // Check if already in cart (use propertyId as string to match both ObjectId and numeric)
    const existing = await Cart.findOne({ userId: req.userId, propertyId: String(propertyId) });
    if (existing) return res.status(400).json({ message: 'Already in your cart' });

    const item = new Cart({ userId: req.userId, propertyId: String(propertyId) });
    await item.save();

    // Try to find property in DB (only if it looks like a valid 24-char hex ObjectId), then sample data
    let property = null;
    
    // Check if propertyId looks like a 24-character hex ObjectId
    if (String(propertyId).match(/^[0-9a-fA-F]{24}$/)) {
      try {
        property = await Property.findById(propertyId).lean();
      } catch (err) {
        // Not a valid ObjectId, will try sample data
      }
    }
    
    // If not found in DB, try sample data
    if (!property) {
      const sampleProperties = loadSampleProperties();
      property = sampleProperties.find(p => String(p.id) === String(propertyId));
    }
    
    res.json({ 
      message: 'Added to cart', 
      item: { 
        _id: item._id,
        userId: item.userId,
        addedAt: item.addedAt,
        propertyId: property || { id: propertyId } 
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/cart/:propertyId - Remove property from cart
router.delete('/:propertyId', auth, async (req, res) => {
  try {
    const { propertyId } = req.params;
    const result = await Cart.findOneAndDelete({ userId: req.userId, propertyId: String(propertyId) });
    
    if (!result) return res.status(404).json({ message: 'Item not found in cart' });
    
    res.json({ message: 'Removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/cart/check/:propertyId - Check if property is in cart
router.get('/check/:propertyId', auth, async (req, res) => {
  try {
    const { propertyId } = req.params;
    const item = await Cart.findOne({ userId: req.userId, propertyId: String(propertyId) });
    res.json({ inCart: !!item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
