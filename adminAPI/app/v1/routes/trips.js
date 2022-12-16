const express = require('express');
const trips = require('../models/trips');
// const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
const routeName = '/trips';

router.get(`${routeName}/:username`, trips.getTripsByUsername);
router.get(`${routeName}/`, trips.getAllTrips);

module.exports = router;
