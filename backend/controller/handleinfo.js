require("dotenv").config({ path: '../.env'});
const bcrypt = require('bcryptjs');
const con = require('../db/db');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const axios = require('axios');
const { CryptoCurrency, CurrencyData, ChartData } = require('../models')
const { Op, ConnectionTimedOutError } = require('sequelize')


const DelTable = async (req) => {
  try {
    await ChartData.truncate()
  } catch (error) {
    console.error("Scary error message yet again", error)
  }
}



const getData = async (req) => {
  for (i=1; i < 6; i += 1) {
    try {
      //  Using gecko to recieve data from about 1000 different top crypto currencies
      // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=${i}&sparkline=true`, {
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
            }, {logging: false},
          );
        }

        
        let currency = await CurrencyData.findOne({ where: { crypto_id: crypto.id } });


        
        if (!currency) {
          await CurrencyData.create({
            crypto_id: crypto.id,
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
            {logging: false},
          );
        } else {
          await CurrencyData.update(
            {
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
            { where: { crypto_id: crypto.id }},
            {logging: false},
          );

          // Chart data that is being fetched doesnt have a timestamp, so I need to add the hourly to it
          
          
          // I have no inherent fix for the data insertion yet, using unique filtering in the
          //  backend causes only 400 rows to be entered to the database, I am assuming it is
          // caused by duplicate value that is then raising some sort of error that im not seeing
          // because I haven't fixed the logging problem. If I dont use the unique filtering then 
          // the obvious happens, where the same data gets inserted over and over again.

          // What I am thinking about: Getting the current date, and then moving that to a week ago so I could map the price values together, with the hourly
          // to then keep incrementing the time by one hour, until it reaches the starting date again, and at that point it gets reset, so the next map could happen
          try {
            const prices = coin.sparkline_in_7d.price;

            const time = new Date(coin.last_updated);
            //  Getting the date from 1 week ago 
            Math.floor(time.setDate(time.getDate() - 7));
            // 168 cuz its how many hours are in 1 week
            const intervalForChart = 168;

            const chartTime = prices.map((price) => {
                // const rawTime = time.getTime() - (prices.length - 1 - i) * intervalForChart;
                // const timestamp = new Date(rawTime) + ((60 * 1000) * 60);
                  var timestamp = Math.floor(time.setTime(time.getTime() + (60 * 1000 * (60))));
                
                  
                  console.log(time)
                return {
                    crypto_id: crypto.id,
                    interval: '7d',
                    timestamp,
                    price
                  }
            })


            await ChartData.bulkCreate(chartTime, {
              updateOnDuplicate: ['price']
              
            })



            

          } catch (SequelizeUniqueConstraintError) {
            return;
          }

        }
      });
      await Promise.all(cryptoData);



      await new Promise(r => setTimeout(r, 100000));


        
    console.log({ success: true, message: "Data fetched and saved successfully" });
    } catch (error) {
      throw new Error("Im going to hurt the baby, aka myself")
      // console.error("Somethings is very moldy", error)
    };
  }  
}


module.exports = { 
  getData, DelTable
}