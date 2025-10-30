require("dotenv").config({ path: '../.env'});
const bcrypt = require('bcryptjs');
const con = require('../db/db');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const axios = require('axios');
const { User } = require('../models')



const captchas = {}



// Temporarily disable captcha for more accounts
// Reeusing my login logic from an old project

const createUser = async (req, res) => {
    const { first, last, password, email, phone, address, captcha } = req.body;

    console.log(first, last, phone, email, password, address, captcha)
    if (!first || !last || !password || !email || !phone || !address || !captcha) {
      return res.status(400).json({ error: "Please fill out the necessar fields :)" });
    }

    try {
      // Checking if the user already  exists in the database
      const existingUser = await User.findOne({where: {email}})
      console.log(existingUser)


      if (existingUser) {
        return res.status(400).json({ error: "Email already in use." });
      }

// Makes sure that the captcha is correct
      if (captchas[email] !== parseInt(captcha)) {
        return res.status(400).json("Wrong captcha");
      }


      delete captchas[email]

      // Hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);


    // Creating the user, with the data from the frontend
      const user = await User.create({
        firstName: first,
        lastName: last,
        password_hash: hashedPassword,
        email: email,
        phone_nr: phone,
        address: address
        
      });

      res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    console.log("Checking user in database for email:", email);

    const user = await User.findOne({where: {email}})

    if (!user) {
      console.log("No user found with this email");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("User found:", user.email);
    console.log("Stored hash in DB:", user.password_hash);

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      console.log("Password not correct dumass");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log(`Login successful! User's email: ${user.email}, User's name: ${user.name}`);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN, { expiresIn: "1h" });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    });


    res.json({ token, user: { id: user.id, email: user.email } });
    console.log(token)

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendCaptcha = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  const captcha = 1
  // Math.floor(100000 + Math.random() * 900000);
  captchas[email] = captcha;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GNAME,
      pass: process.env.GPASS,
    },
  });

  const mailOptions = {
    from: process.env.GNAME,
    to: email,
    subject: "Your CAPTCHA Code",
    text: `Your verification code is: ${captcha}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Captcha sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send captcha email." });
  }
}


const getUser = async (req, res) => {
  try {
    const userId = req.user.userId; // From JWT
    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    const user = await User.findOne({
      where: { id: userId },
      attributes: [
        'firstName',
        'lastName',
        'email',
        'phone_nr',
        'address'
    ],
    });

    console.log(user)

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone_nr: user.phone_nr,
        address: user.phone_nr
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {
    createUser, loginUser, getUser, sendCaptcha
}