// services/airportService.js

const Airport = require('../models/airports');

// Function to fetch all airports from the database
async function getAllAirports() {
    try {
        const airports = await Airport.findAll();
        return airports;
    } catch (error) {
        console.error('Error fetching airports:', error);
        throw new Error('Failed to fetch airports');
    }
}



// Export functions
module.exports = {
    getAllAirports
};
