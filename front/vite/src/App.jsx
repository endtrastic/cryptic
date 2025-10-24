import { useState, useEffect } from 'react'
import Card from './comp/UI/Card';
import './App.css'
import './index.css';
import Navbar from './comp/UI/Navbar';
import LoginForm from './comp/UI/LoginForm'
import LoginNavbar from './comp/UI/LoginNavbar';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./page/home";


function App() {

  const [Info, setInfo] = useState(false);
  const [cryptoData, setCryptoData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  console.log("Info received", Info)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5552/auth/verify", {
          method: "GET",
          credentials: "include", 
        });
  
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        setIsLoggedIn(false);
      }
    };
  
    checkAuth();
  }, []);


  const handleLogin = async (email, password) => {
    try {
      // console.log("Sending login request...", { email, password }); Just to not log the email and password

      const response = await fetch("http://localhost:5552/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json(); 
      console.log("Login successful!");

      return data;
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    } 
  };
  console.log(isLoggedIn)


  return (
    <Card className="Card">

      <BrowserRouter>
        {isLoggedIn ? <LoginNavbar setIsLoggedIn={setIsLoggedIn} /> : <Navbar />}

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <LoginForm login={handleLogin} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
              )
            }
          />
          <Route
            path="/home"
            element={
              isLoggedIn ? <Home setIsLoggedIns={setIsLoggedIn} isLoggedIn={isLoggedIn} /> : <Navigate to="/" />
            }
            
          />
        </Routes>
      </BrowserRouter>
    </Card>
    
  )
}
export default App
