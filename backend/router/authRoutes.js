const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const { getData } = require('../controller/handleinfo');
const { createUser, loginUser, sendCaptcha, getUser } = require('../controller/handleUser');


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 10, // Limit each IP to 10 requests per windowMs
    message: 'Too many requests, please try again later',
});



// User part ----------------------------------------------



// POST /api/signup - Signup route
router.post('/signup', limiter, createUser);
// POST /api/login - Login route
router.post('/login', limiter, loginUser);

// CAPTCHA ROUTE
router.post('/captcha', limiter, sendCaptcha)

// Getting the user /getuser
// router.get('/getUser', authenticateToken,  getUser)



// ----------------------------------------------





router.get('/cryptos', getData);




module.exports = router;