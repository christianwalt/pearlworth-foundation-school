import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

//GET ROUTE FOR HOME
app.get('/home', (req, res) => {
  res.render('home');
});

//GET ROUTE FOR ABOUT
app.get('/about', (req, res) => {
  res.render('about');
});

//GET ROUTE FOR ADMISSIONS
app.get('/admissions', (req, res) => {
  res.render('admissions');
});

//GET ROUTE FOR CIRCULAR
app.get('/resources', (req, res) => {
  res.render('resources');
});

//GET ROUTE FOR WORKBOOKS
app.get('/workbooks', (req, res) => {
  res.render('workbooks');
});

//GET ROUTE FOR CONTACT
app.get('/contact', (req, res) => {
  res.render('contact');
});

//GET ROUTE FOR SCHOOL LIFE
app.get('/school_life', (req, res) => {
  res.render('school_life');
});

//GET ROUTE FOR STAFF
app.get('/staff', (req, res) => {
  res.render('staff');
});

//GET ROUTE FOR SUPPORT
app.get('/support', (req, res) => {
  res.render('support');
});

// GET route for homework
app.get('/homework', (req, res) => {
  res.render('homework');
});

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Fix: Correct the property name from 'Storage' to 'storage'
const upload = multer({ storage: storage });

// POST route for PDF upload
app.post('/upload-pdf', upload.single('pdfFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: 'New Applicant',
    to: process.env.NODEMAILER_USER, // Send to yourself or another designated email
    subject: 'New Application Form Submission',
    text: 'A new application form has been submitted. Please find the attached PDF.',
    attachments: [
      {
        filename: req.file.originalname,
        path: req.file.path
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    
    // Delete the file after sending
    fs.unlinkSync(req.file.path);

    res.redirect('http://localhost:3000/admissions');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to submit application. Please try again later.');
  }
});

// POST route for contact form
app.post('/submit-form', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  // Setup email options
  const mailOptions = {
    from: email,
    to: process.env.NODEMAILER_USER, 
    subject: `New Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.redirect('http://localhost:3000/contact');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send message. Please try again later.');
  }

  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
