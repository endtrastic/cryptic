import { useState, useEffect } from "react";
import Card from "../UI/Card";
import Popupad from "./popupad";


const LoginForm = ({ login, setIsLoggedIn, isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [canRun, setCanRun] = useState(false)

// Every second and every canRun switch calls the useEffect thingy, and then checks if the parameters fit. 
// All of the code should go under the e.preventDefault learn from my mistakes, it refreshed the page and makes your life more miserable maybe.


  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log("Logging in ", {email})

    setCanRun(true)

    setErrors({});
    let validationErrors = {};



    if (!email.includes('@')) validationErrors.email = 'Email must be valid.';
    if (password.length < 6) validationErrors.password = 'Password must be at least 6 characters.';
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    try {
      const response = await login(email, password);

      if (response.token) {
        console.log('Login token successful!');
        setIsLoggedIn(true)
      }
    } catch (error) {
      setErrors({ global: 'Invalid credentials or network error.' });
    }
  };

  return (
  <div id="centercard">
    <Card className='Loginform'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {errors.global && <div className="alert">{errors.global}</div>}
        <div>
          <input type="email" placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <input type="password"  placeholder="Password" autoComplete="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <div className="error" >{errors.password}</div>}
        </div>
        <button type="submit" className="button">
        </button>
      </form>
      <Popupad/>
    </Card>
  </div>
  );
}

export default LoginForm;