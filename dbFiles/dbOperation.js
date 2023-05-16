const pool = require("./dbConfig");

// async function getCourseFromDate() {
//   return new Promise((resolve, reject) => {
//     config.query(
//       "SELECT * FROM Courses ",
//       (err, res) => {
//         if (err) {
//           console.error(err);
//           reject(err);
//         } else {
//           resolve(res.rows);
//         }
//         config.end();
//       }
//     );
//   });
// }

async function fetchCourses(day) {
  try {
    const res = await pool.query("SELECT * FROM Courses WHERE day = $1", [day]);
    return res.rows;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { fetchCourses };
