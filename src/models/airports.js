const { DataTypes } = require("sequelize");
const db = require("../../config/database");

const Airport = db.define("Airport", {
    airport_icao: { type: DataTypes.STRING },
    airport_name: { type: DataTypes.STRING },
    airport_city: { type: DataTypes.STRING },
    airport_iata: { type: DataTypes.STRING }
});

module.exports = Airport;

// Array of hardcoded airport data
const airportsData = [
    { airport_icao: 'VEJH', airport_name: 'PURI AIRPORT', airport_city: 'Puri', airport_iata: 'BBI' },
   
    { airport_icao: 'VOCB', airport_name: 'Coimbatore International Airport', airport_city: 'Coimbatore', airport_iata: 'CJB' },
    { airport_icao: 'VABB', airport_name: 'Chhatrapati Shivaji Maharaj International Airport', airport_city: 'Mumbai', airport_iata: 'BOM' }
 
];

// Function to check if the airport table is empty
async function isAirportTableEmpty() {
    try {
        const count = await Airport.count();
        return count === 0;
    } catch (error) {
        console.error('Error checking if airport table is empty:', error);
        return true; // Assume table is empty if there's an error
    }
}

// Function to insert hardcoded airport data into the database
async function insertHardcodedData() {
    try {
        // Check if the airport table is empty
        const isEmpty = await isAirportTableEmpty();

        // If the table is empty, insert the hardcoded data
        if (isEmpty) {
            // Loop through the array and insert each airport data into the database
            for (const airportData of airportsData) {
                await Airport.create(airportData);
            }
            console.log('Hardcoded data inserted successfully.');
        } else {
            console.log('Airport table already contains data. Skipping insertion.');
        }
    } catch (error) {
        console.error('Error inserting hardcoded data:', error);
    }
}
// Synchronize Sequelize models with the database and then insert hardcoded data
db.sync()
    .then(() => {
        console.log('Database synchronized successfully.');
        // Call the function to insert hardcoded data after synchronization
        insertHardcodedData();
    })
    .catch(error => {
        console.error('Error synchronizing database:', error);
    });
// Call the function to insert hardcoded data
insertHardcodedData();
