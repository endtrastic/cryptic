require("dotenv").config({ path: '../.env'});
const bcrypt = require('bcryptjs');
const con = require('../db/db');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const axios = require('axios');
const { CryptoCurrency, CurrencyData } = require('../models')
const { Op } = require('sequelize')



const getData = async (req) => {
  try {
    //  Using gecko to recieve data from about 100 different top crypto currencies
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1', {
      }
    
    );
    console.log(response.data);

    const cryptoData = response.data.map(async (coin) => {
      let crypto = await CryptoCurrency.findOne({ where: { c_id: coin.id } });

      if (!crypto) {
        crypto = await CryptoCurrency.create({
          c_id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          image_url: coin.image,
          ath: coin.ath,
          ath_date: new Date(coin.ath_date),
          atl: coin.atl,
          atl_date: new Date(coin.atl_date),
          max_supply: coin.max_supply,
          roi: coin.roi,
        });
      }


      await CurrencyData.findOrCreate({
        where: { crypto_id: crypto.id },
        defaults: {
          current_price: coin.current_price,
          market_cap: coin.market_cap,
          fully_diluted_valuation: coin.fully_diluted_valuation || null,
          market_cap_rank: coin.market_cap_rank,
          total_volume: coin.total_volume,
          high_24h: coin.high_24h,
          low_24h: coin.low_24h,
          price_change_24h: coin.price_change_24h,
          price_change_pct_24h: coin.price_change_percentage_24h,
          market_cap_change_24h: coin.market_cap_change_24h,
          market_cap_change_pct_24h: coin.market_cap_change_percentage_24h,
          circulating_supply: coin.circulating_supply,
          total_supply: coin.total_supply,
          last_updated: new Date(coin.last_updated),
        },
      });
    });

    await Promise.all(cryptoData);
      
  console.log({ success: true, message: "Data fetched and saved successfully" });
  } catch (error) {
    throw new Error("Im going to hurt the baby, aka myself")
    // console.error("Somethings is very moldy", error)
  };

};






module.exports = { 
  getData, 
}