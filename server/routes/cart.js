const express = require('express');
const auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/', auth, cartController.getCart);
router.post('/', auth, cartController.addToCart);
router.delete('/:propertyId', auth, cartController.removeFromCart);
router.get('/check/:propertyId', auth, cartController.checkInCart);

module.exports = router;
