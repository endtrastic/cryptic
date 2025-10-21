import { useState, useEffect } from 'react'
import Card from './comp/UI/Card';
import './App.css'

function App() {

  const [Info, setInfo] = useState(false);
  const [cryptoData, setCryptoData] = useState(null);


  useEffect(() => {
    const checkcrypapi = async () => {
      try {
        const response = await fetch("http://localhost:5552/api/cryptos", {
          method: "GET",
          credentials: "include", 
        });
  
        if (response.ok) {
          const data = await response.json(); 
          setCryptoData(data);                
          setInfo(true);                      
        } else {
          setInfo(false);
        }
      } catch (error) {
        console.error("Error, too many requests probably:", error);
      }
    };
  
    checkcrypapi();
  }, []);

  console.log("Info received", Info)

  return (
    <Card className="idk">

      {cryptoData ? (
        <pre>{JSON.stringify(cryptoData, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}

    </Card>
    
  )
}

export default App
