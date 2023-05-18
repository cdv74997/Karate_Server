require('dotenv').config(); // Load environment variables from .env file

const { Pool } = require("pg"); // Importing the Pool object from the pg module

const pool = new Pool({
  connectionString: process.env.DB_CONNECT, // Setting the connection string for the PostgreSQL database
});

module.exports = pool; // Exporting the pool object for use in other modules
