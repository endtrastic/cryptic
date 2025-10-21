const express = require('express');
const router = express.Router();
const { getData, getDataFromDatabase } = require('../controller/handleinfo');

router.get('/cryptos', getData);
router.get('/cryptosbase', getDataFromDatabase);

module.exports = router;