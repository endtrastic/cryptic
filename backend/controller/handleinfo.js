require("dotenv").config({ path: '../.env'});
const bcrypt = require('bcryptjs');
const con = require('../db/db');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const axios = require('axios');
const { Cryptocurrencies, CurrencyData } = '../models'
const { Op } = require('sequelize')




// const getData = async (req, res) => {
//   try {
//     const response = await axios.get(
//       'https://api.coingecko.com/api/v3/coins/markets', {
//         params: {
//           vs_currency: 'usd',
//           order: 'market_cap_desc',
//           per_page: 25,
//           page: 1,
//         }
//       }
//     );

//     res.json({
//       cryptocurrencies: response.data,
//     });
//   } catch (error) {
//     console.error('Error fetching crypto data:', error.message);
//     res.status(500).json({ error: 'Failed to fetch crypto data' });
//   }
// };









const fs = require('fs');
const path = require('path');

const getData = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/data.json'); // Adjust path as needed
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData);

    res.json({ cryptocurrencies: jsonData });
  } catch (error) {
    console.error('Error reading local data.json:', error.message);
    res.status(500).json({ error: 'Failed to read local crypto data' });
  }
};


const getDataFromDatabase = async (req, res) => {


  try {
    const crypto = await Cryptocurrencies.findAll()


    console.log(crypto)

    if (!crypto) {
      return res.status(404).json({ error: 'Currency not available' });
    }

    return res.status(200).json({
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const getBTC7DayChart = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
      {
        params: {
          vs_currency: 'usd',
          days: 7,
        }
      }
    );

    const prices = response.data.prices;
    console.log(prices);
  } catch (error) {
    console.error('Error fetching BTC chart data:', error.response?.data || error.message);
  }
};

const getBTC1DayChart = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
      {
        params: {
          vs_currency: 'usd',
          days: 1,
        }
      }
    );

    const prices = response.data.prices;
    console.log(prices);
  } catch (error) {
    console.error('Error fetching BTC chart data:', error.response?.data || error.message);
  }
};



module.exports = { 
  getData, getDataFromDatabase
}