const Property = require('../models/Property');
const Cart = require('../models/Cart');

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.userId;
    let recommended = [];

    if (userId && userId !== 'mock-user-id') {
      // Find properties already in user's cart to understand preferences
      const userCart = await Cart.find({ userId });
      const savedPropertyIds = userCart.map(item => item.propertyId);

      if (savedPropertyIds.length > 0) {
        // Get details of saved properties
        const savedProperties = await Property.find({ _id: { $in: savedPropertyIds } });
        
        // Find similar properties (by type and location)
        const types = [...new Set(savedProperties.map(p => p.type))];
        const locations = [...new Set(savedProperties.map(p => p.location))];

        recommended = await Property.find({
          _id: { $nin: savedPropertyIds },
          $or: [
            { type: { $in: types } },
            { location: { $in: locations } }
          ]
        }).limit(6);
      }
    }

    // Fallback: If no personal recommendations, return "trending" (most recent/random)
    if (recommended.length < 3) {
      const more = await Property.find({
        _id: { $nin: recommended.map(p => p._id) }
      })
      .sort({ createdAt: -1 })
      .limit(6 - recommended.length);
      
      recommended = [...recommended, ...more];
    }

    res.json(recommended);
  } catch (err) {
    console.error('Recommendation Error:', err);
    res.status(500).json({ message: 'Failed to fetch recommendations' });
  }
};
