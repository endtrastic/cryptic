import { Link } from "react-router-dom";



const LoginNavbar = ({ setIsLoggedIn }) => {

    const handleLogout = async () => { 
        await fetch("http://localhost:5552/logout", { 
          method: "POST", 
          credentials: "include" 
        });
        setIsLoggedIn(false);
      };

  return (
    <nav role="menu">
      <label data-role="burger"><input type="checkbox" /></label>
      <ul role="menubar">
        <li><strong>Cryptic</strong></li>
      </ul>
      <header>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.svg" />
      </header>

      <ul role="menuitem">
        <li><Link to="/home">Profile</Link></li>
        <li><Link to="/match">Currencies</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default LoginNavbar;
