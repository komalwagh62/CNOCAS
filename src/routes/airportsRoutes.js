// routes/airportRoutes.js

const express = require('express');
const airportController = require('../controllers/airportController');

// Create router instance
const router = express.Router();

// Define route for fetching all airports
router.get('/airports', airportController.getAllAirports);

module.exports = router;
