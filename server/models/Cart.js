const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: String, required: true }, // Changed to String to support both ObjectId and numeric IDs
  addedAt: { type: Date, default: Date.now },
});

// Ensure a user can only add a property once
cartSchema.index({ userId: 1, propertyId: 1 }, { unique: true });

module.exports = mongoose.model('Cart', cartSchema);
