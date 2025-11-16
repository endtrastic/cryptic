require("dotenv").config({ path: '../.env'});
const bcrypt = require('bcryptjs');
const con = require('../db/db');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const axios = require('axios');
const { CryptoCurrency, CurrencyData, ChartData } = require('../models')
const { Op, ConnectionTimedOutError } = require('sequelize')



const RecieveCoin = async(req, res) => {
    try {
        let coins = await CryptoCurrency.findAll({
            // ASC so I could map it straigth forwards
            order: [["id", "ASC"]], 
            attributes: [
                'id',
                'image_url',
                'ath',
                'name',

            ],
            include: [
                {   
                    //  Model name
                    model: CurrencyData,
                    // Enter the alias for the model associated by said table
                    as: 'dataPoints', // Getting all of the matches, that are associated with given user
                    attributes: ['current_price', 'high_24h', 'low_24h', 'price_change_24h', 'market_cap_rank','market_cap',]
                }
            ], limit: 10
        })

        console.log(coins)


        if (!coins) {
            return res.status(404).json({ error: 'No coin found unfortunately' });
        }

        //  mapping the array of data
        const mappedCoins = coins.map(c => ({
            id: c.id,
            image_url: c.image_url,
            ath: c.ath,
            name: c.name,
            coinData: c.dataPoints

        }))
        console.log(mappedCoins)

        return res.status(200).json({
            res: mappedCoins
        });

    } catch (error) {
        console.error("Server error", error)
        return res.status(500).json({ error: "Internal server error" });
    }
    
}


// Help recieve the chart in the frontend
const RecieveChart = async(req, res) => {
    const id = req.body.id
    try {

        if (!id) {
            return res.status(404).json({ error: 'No id found unfortunately' });
        }
        //  Finding all of the Chart data with that specific ID, and ordering them by DESC for graphing 
        let chart = await ChartData.findAll({
            order: [["crypto_id", "DESC"]], 
            where: {c_id: id},
            attributes: [
                'id',
                'crypto_id',
                'interval',
                'price',

            ],
        })

        const chartMap = chart.map(cm => ({
            id: cm.id,
            crypto_id: cm.crypto_id,
            interval: cm.interval,
            price: cm.price
        }))


        return res.status(200).json({
            result: chartMap
        })
    } catch (error) {
        console.error("Server error", error)
        return res.status(500).json({ error: "Internal server error" });
    }
    
}

module.exports = {
    RecieveChart, RecieveCoin
}