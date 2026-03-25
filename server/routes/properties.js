const express = require('express');
const propertyController = require('../controllers/propertyController');

const router = express.Router();

router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getPropertyById);

module.exports = router;
