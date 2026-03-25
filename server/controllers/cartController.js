const fs = require('fs');
const path = require('path');
const Cart = require('../models/Cart');
const Property = require('../models/Property');

// Helper: load sample data file
const loadSampleProperties = () => {
  try {
    const file = path.join(__dirname, '..', 'data', 'properties.json');
    const raw = fs.readFileSync(file, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
};

exports.getCart = async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.userId }).sort({ addedAt: -1 }).lean();
    const sampleProperties = loadSampleProperties();
    const populatedItems = [];

    for (const item of items) {
      let property = null;
      if (String(item.propertyId).match(/^[0-9a-fA-F]{24}$/)) {
        try {
          property = await Property.findById(item.propertyId).lean();
        } catch (err) {
          // Not a valid ObjectId
        }
      }
      if (!property) {
        property = sampleProperties.find((p) => String(p.id) === String(item.propertyId));
      }
      if (property) {
        populatedItems.push({
          _id: item._id,
          userId: item.userId,
          addedAt: item.addedAt,
          propertyId: property,
        });
      }
    }
    res.json(populatedItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { propertyId } = req.body;
    if (!propertyId) return res.status(400).json({ message: 'Property ID required' });

    const existing = await Cart.findOne({ userId: req.userId, propertyId: String(propertyId) });
    if (existing) return res.status(400).json({ message: 'Already in your cart' });

    const item = new Cart({ userId: req.userId, propertyId: String(propertyId) });
    await item.save();

    let property = null;
    if (String(propertyId).match(/^[0-9a-fA-F]{24}$/)) {
      try {
        property = await Property.findById(propertyId).lean();
      } catch (err) {
        // Not a valid ObjectId
      }
    }
    if (!property) {
      const sampleProperties = loadSampleProperties();
      property = sampleProperties.find((p) => String(p.id) === String(propertyId));
    }

    res.json({
      message: 'Added to cart',
      item: {
        _id: item._id,
        userId: item.userId,
        addedAt: item.addedAt,
        propertyId: property || { id: propertyId },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const result = await Cart.findOneAndDelete({
      userId: req.userId,
      propertyId: String(propertyId),
    });
    if (!result) return res.status(404).json({ message: 'Item not found in cart' });
    res.json({ message: 'Removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.checkInCart = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const item = await Cart.findOne({ userId: req.userId, propertyId: String(propertyId) });
    res.json({ inCart: !!item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
