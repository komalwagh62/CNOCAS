const { DataTypes } = require("sequelize");
const db = require("../../config/database");

const Airport = db.define("Airport", {
    airport_icao: { type: DataTypes.STRING },
    airport_name: { type: DataTypes.STRING },
    airport_city: { type: DataTypes.STRING },
});

module.exports = Airport;

// Array of hardcoded airport data
const airportsData = [
    // { airport_icao: 'VAAH', airport_name: 'SARDAR VALLABH BHAI PATEL INTERNATIONAL AIRPORT, AHMEDABAD',airport_city:'Ahmedabad' },
    // { airport_icao: 'VAAU', airport_name: 'AURANGABAD AIRPORT, AURANGABAD',airport_city:'Aurangabad' },
    // { airport_icao: 'VABB', airport_name: 'CHHATRAPATI SHIVAJI MAHARAJ INTERNATIONAL AIRPORT, MUMBAI',airport_city:'Mumbai' },
    // { airport_icao: 'VABO', airport_name: 'VADODARA AIRPORT, VADODARA',airport_city:'Vadodara' },
    // { airport_icao: 'VABP', airport_name: 'RAJA BHOJ AIRPORT, BHOPAL',airport_city:'Bhopal' },
    // { airport_icao: 'VABV', airport_name: 'BHAVNAGAR AIRPORT, BHAVNAGAR',airport_city:'Bhavnagar' },
    // { airport_icao: 'VADN', airport_name: 'DAMAN - COAST GUARD AIR STATION',airport_city:'Daman' },
    // { airport_icao: 'VAGD', airport_name: 'GONDIA AIRPORT',airport_city:'Gondia' },
    // { airport_icao: 'VAHS', airport_name: 'RAJKOT INTERNATIONAL AIRPORT, RAJKOT',airport_city:'Rajkot' },
    // { airport_icao: 'VAID', airport_name: 'DEVI AHILYA BAI HOLKAR AIRPORT, INDORE',airport_city:'Indore' },
    // { airport_icao: 'VAJB', airport_name: 'JABALPUR AIRPORT, JABALPUR',airport_city:'Jabalpur' },
    // { airport_icao: 'VAJJ', airport_name: 'JUHU AIRPORT, MUMBAI',airport_city:'Mumbai' },
    // { airport_icao: 'VAJL', airport_name: 'JALGAON AIRPORT, JALGAON',airport_city:'Jalgaon' },
    // { airport_icao: 'VAKE', airport_name: 'KANDLA AIRPORT, KANDLA',airport_city:'Kandla' },
    { airport_icao: 'VAKP', airport_name: 'KOLHAPUR AIRPORT, KOLHAPUR' ,airport_city:'Kolhapur'},
    { airport_icao: 'VAKS', airport_name: 'KESHOD AIRPORT, KESHOD',airport_city:'Keshod' },
    { airport_icao: 'VANP', airport_name: 'DR BABASAHEB AMBEDKAR INTERNATIONAL AIRPORT , NAGPUR',airport_city:'Nagpur' },
    // { airport_icao: 'VAOZ', airport_name: 'OZAR AIRPORT' ,airport_city:'Ozar'},
    { airport_icao:'VEJH', airport_name:'PURI AIRPORT',airport_city:'Puri'}

    // Add more airports as needed
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
