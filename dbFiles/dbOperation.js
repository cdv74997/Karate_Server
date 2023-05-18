const pool = require("./dbConfig"); // Importing the database connection pool

async function fetchCourses(day) {
  try {
    const res = await pool.query("SELECT * FROM Courses WHERE day = $1", [day]); // Performing a query to fetch courses for a specific day
    return res.rows; // Returning the fetched rows from the query result
  } catch (err) {
    console.error(err); // Logging any errors that occur during the query execution
  }
}

module.exports = { fetchCourses }; // Exporting the fetchCourses function to be used in other modules

