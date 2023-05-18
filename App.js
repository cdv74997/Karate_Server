const express = require("express"); // Importing the express module
const dbOperation = require("./dbFiles/dbOperation"); // Importing the custom module dbOperation
const cors = require("cors"); // Importing the cors module
const nodemailer = require('nodemailer'); // Importing the nodemailer module
const bodyParser = require('body-parser'); // Importing the body-parser module

const API_PORT = process.env.PORT || 5000; // Setting the API port

const app = express(); // Creating an instance of the express application

app.use(cors()); // Enabling Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parsing JSON request bodies

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_HOST, // SMTP host
    pass: process.env.SMTP_PASSWORD, // SMTP password
  },
});

// Endpoint to send an email this is used to confirm the appointment
app.post('/send-email', async (req, res) => {
  try {
    const { from, to, subject, body } = req.body;

    const mailOptions = {
      from,
      to,
      subject,
      text: body,
    };

    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
    res.status(200).send('Email sent successfully');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to fetch data for our courses from the database
app.get("/api/data/", async (req, res) => {
  try {
    const data = await dbOperation.fetchCourses(req.query.day);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`)); // Starting the server and listening on the specified port