const express = require("express");
const dbOperation = require("./dbFiles/dbOperation");
const cors = require("cors");
// for smtp
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const API_PORT = process.env.PORT || 5000;
const app = express();
const corsOptions = {
    origin: "*",
  };
app.use(cors(corsOptions));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_HOST,
    pass: process.env.SMTP_PASSWORD,
  },
  
});

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

app.get("/api/data/", async (req, res) => {
  try {
    const data = await dbOperation.fetchCourses(req.query.day);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





//
//app.get("/api", function(req, res) {
//    console.log('Called');
//    res.send({result: "Hello"})
//})
//
//app.get("/quit", function(req, res) {
//    console.log('Called quit');
//    res.send({result: "Good Bye"})
//})

// try {
//   console.log("hello");
//   dbOperation.fetchCourses(5).then((res) => {
//     console.log(res);
//   });
// } catch (error) {
//   console.error(error);
// }

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));