import { useState, useEffect } from "react";
import Card from "../comp/UI/Card";


const Home = () => {
  console.log("Hi");

  const [data, setData] = useState([])

  useEffect(() => { 
    const DataFetching = async () => {
      try {
        const response = await fetch("http://localhost:5552/api/cryptos", {
            method: "GET",
            credentials: "include"
          })
        if (response.ok) {
          const result = await response.json();
          setData(result.CurrencyData)
        } else {
          console.error("God damnit, another one");
        }
      } catch (error) {
        console.error("Error fetching nthe data: ", error);
      }
    }
    DataFetching();

  }, [])


  console.log("This is the data: ", data)



  return (
    <Card className="Hi">
      <h1>Hi users</h1>
      <div>
        {data.length > 0 ? (
          data.map((coin, index) => (
            <div key={index}>
              <h3>{coin.name} ({coin.symbol})</h3>
              <p>Price: ${coin.current_price}</p>
              <img src={coin.image_url} alt={coin.name} width={50} height={50} />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Card>
  );
};

export default Home;
