const express = require('express');
const fs = require('fs');
const path = require('path');
const Property = require('../models/Property');

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

// GET /api/properties
// If DB has entries, return from DB; otherwise return sample JSON
// Supports query params: ?location=&type=&minPrice=&maxPrice=&bedrooms=
router.get('/', async (req, res) => {
  try {
    const { location, type, minPrice, maxPrice, bedrooms, search } = req.query;
    
    const count = await Property.countDocuments();
    let props;
    
    if (count > 0) {
      const filter = {};
      
      if (location) filter.location = new RegExp(location, 'i');
      if (type) filter.type = new RegExp(type, 'i');
      if (bedrooms) filter.bedrooms = parseInt(bedrooms);
      if (search) {
        filter.$or = [
          { title: new RegExp(search, 'i') },
          { location: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') }
        ];
      }
      
      props = await Property.find(filter).lean();
      
      // Filter by price if needed (prices are strings like "$690,000")
      if (minPrice || maxPrice) {
        props = props.filter(p => {
          const price = parseInt(p.price.replace(/[^0-9]/g, ''));
          const min = minPrice ? parseInt(minPrice) : 0;
          const max = maxPrice ? parseInt(maxPrice) : Infinity;
          return price >= min && price <= max;
        });
      }
      
      return res.json(props);
    }

    // Fallback to sample data with filtering
    let sample = loadSampleProperties();
    
    if (location) sample = sample.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
    if (type) sample = sample.filter(p => p.type.toLowerCase().includes(type.toLowerCase()));
    if (bedrooms) sample = sample.filter(p => p.bedrooms === parseInt(bedrooms));
    if (search) {
      const s = search.toLowerCase();
      sample = sample.filter(p => 
        p.title.toLowerCase().includes(s) ||
        p.location.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s)
      );
    }
    
    return res.json(sample);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/properties/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // try DB first
    const prop = await Property.findById(id).lean().catch(() => null);
    if (prop) return res.json(prop);

    // otherwise look in sample data by numeric id property
    const sample = loadSampleProperties();
    const found = sample.find(p => String(p.id) === String(id) || String(p._id) === String(id));
    if (found) return res.json(found);

    return res.status(404).json({ message: 'Property not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
