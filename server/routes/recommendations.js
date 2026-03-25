const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const auth = require('../middleware/auth');

// GET /api/recommendations - Smart suggestions
router.get('/', auth, recommendationController.getRecommendations);

module.exports = router;
