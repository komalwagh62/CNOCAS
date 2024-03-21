// controllers/airportController.js

const airportService = require('../services/airportsService');

// Controller function to handle GET request for fetching all airports
async function getAllAirports(req, res) {
    try {
        const airports = await airportService.getAllAirports();
        res.json({ airports });
    } catch (error) {
        console.error('Error fetching airports:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    getAllAirports,
};


