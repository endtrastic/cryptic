import { useState, useEffect } from "react";
import Card from "../comp/UI/Card";
import Coin from "../comp/UI/Coin";


const Home = () => {
  console.log("Hi");

  // console.log("This is the data: ", data)



  return (
    <Card className="Hi">
      <h1>Hello users</h1>
      <div>
        <Coin/>



      </div>
    </Card>
  );
};

export default Home;
