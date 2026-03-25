const fs = require('fs');
const path = require('path');
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

exports.getProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      location,
      type,
      minPrice,
      maxPrice,
      bedrooms,
      search,
    } = req.query;

    const count = await Property.countDocuments().catch(() => 0);
    let props,
      total = 0;

    if (count > 0) {
      const filter = {};
      if (location) filter.location = new RegExp(location, 'i');
      if (type) filter.type = new RegExp(type, 'i');
      if (bedrooms) filter.bedrooms = parseInt(bedrooms);
      if (search) {
        filter.$or = [
          { title: new RegExp(search, 'i') },
          { location: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
        ];
      }

      let query = Property.find(filter).lean();
      props = await query.exec();

      if (minPrice || maxPrice) {
        props = props.filter((p) => {
          const price = parseInt(p.price.replace(/[^0-9]/g, ''));
          const min = minPrice ? parseInt(minPrice) : 0;
          const max = maxPrice ? parseInt(maxPrice) : Infinity;
          return price >= min && price <= max;
        });
      }

      total = props.length;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      props = props.slice(skip, skip + parseInt(limit));

      return res.json({
        properties: props,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit),
      });
    }

    // Fallback to sample data
    let sample = loadSampleProperties();
    if (location)
      sample = sample.filter((p) => p.location.toLowerCase().includes(location.toLowerCase()));
    if (type) sample = sample.filter((p) => p.type.toLowerCase().includes(type.toLowerCase()));
    if (bedrooms) sample = sample.filter((p) => p.bedrooms === parseInt(bedrooms));
    if (search) {
      const s = search.toLowerCase();
      sample = sample.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.location.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s)
      );
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedSample = sample.slice(startIndex, startIndex + limitNum);

    res.json({
      properties: paginatedSample,
      total: sample.length,
      page: pageNum,
      totalPages: Math.ceil(sample.length / limitNum),
      limit: limitNum,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const prop = await Property.findById(id)
      .lean()
      .catch(() => null);
    if (prop) return res.json(prop);

    const sample = loadSampleProperties();
    const found = sample.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
    if (found) return res.json(found);

    res.status(404).json({ message: 'Property not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
