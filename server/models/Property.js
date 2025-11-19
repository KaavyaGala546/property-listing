const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  type: String,
  bedrooms: Number,
  bathrooms: Number,
  area: String,
  price: String,
  description: String,
  features: [String],
  images: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Property', propertySchema);
