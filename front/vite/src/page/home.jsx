import { useState, useEffect } from "react";
import Card from "../comp/UI/Card";


const Home = () => {
  console.log("Hi");

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
