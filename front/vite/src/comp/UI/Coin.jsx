import { useEffect, useState } from "react"
import Card from "./Card"



const Coin = () => {

    const [CoinData, setCoinData] = useState([])
    const [COinData2, setCoinData2] = useState([])    


    const DataGet = async () => {
        try {   
            const response = await fetch('http://localhost:5552/api/coins', {
                method: "GET",
            });

             if (!response.ok) throw new Error("Failed to fetch");

            if (response.ok) {
                console.log("Everything is fine", response)
                const data = await response.json()
                console.log(data.res)
                setCoinData(data.res)
                setCoinData2(data.res.coinData)
            }

            
        } catch (error) {
            console.error("Error with recieving data", error)
        }

    }


    useEffect(() => {
        DataGet()
    }, []);


    return (
        <>
            {CoinData && CoinData.map((c, index) => 
            <Card className='coins'>
            <li key={index}>
                <p>Name: {c.name}</p>
                <p>Image: {c.image_url}</p>
                <p>Ath: {c.ath}</p>
                {c && c.coinData.map((coin) => 
                    <li key={index}>
                        <p>Current price: {coin.current_price}</p>
                        <p>24h HIGH: {coin.high_24h}</p>
                        <p>24h LOW: {coin.low_24h}</p>

                    </li>
                )}
            </li>
            </Card>
            )}
        </>
    )
}

export default Coin;