const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('../config/database');

// ==============================middleware==============================================

app.use(express.json());
app.use(cors());
dotenv.config();
app.use(bodyParser.json());




// ===============================DB connection===========================================
let PORT = process.env.PORT || 3001;

sequelize.sync()
  .then(() => {
    console.log('Connected to PostgreSQL database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .then(() => {
    console.log('Users table created successfully');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err);
  });

// =======================================api routes=================================

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);


const airportRoutes = require('./routes/airportsRoutes');
// Use airportRoutes for handling airport-related routes
app.use('/api', airportRoutes);


const otpRoutes = require('./routes/otpRoutes');
app.use('/api/otp', otpRoutes);

const subscriptionRoutes = require('./routes/subscriptionRoutes');
app.use('/api/subscription', subscriptionRoutes);



// ====================================port==========================================
