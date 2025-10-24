import Popup from "reactjs-popup";
import { useState, useEffect } from "react";

// ADD USERNAME TO THE USER MAKING PART
// It's illegal to update the styling before implementing the functionality

const Popupad = () => {
  const [signupFirst, setSignupFirst] = useState("")
  const [signupLast, setSignupLast] = useState("")
  const [signupPassword, setSignupPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupAddress, setSignupAddress] = useState("");
  const [signupCap, setSignupCap] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [canCap, setcanCap] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    let newErrors = {};


    if (!signupFirst) {
        newErrors.first = "First name is required";
    }

    if (!signupLast) {
        newErrors.last = "Lastname is required";
    }



    if (!signupEmail) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupEmail)) {
      newErrors.email = "Invalid email format";
    }


    if (!signupPhone) {
        newErrors.phone = "Please insert a phone number"
    } else if (signupPhone.length < 7) {
        newErrors.phone = "Phone number should be longer than 7 numbers"

    }

    if (!signupPassword) {
      newErrors.password = "Password is required";
    } else if (signupPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!signupAddress) {
        newErrors.address = "Please enter your address!";
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const apiCall = async (url, method, body) => {
      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          setErrors({ global: data.error || "Something went wrong." });
          return null; // Return null on error
        }
  
        return data; // Return data on success
      } catch (error) {
        setErrors({ global: "Something went wrong. Please try again." });
        return null;
      }
    };
  
    if (!canCap) {
      // Request CAPTCHA
      const captchaResponse = await apiCall("http://localhost:5552/api/captcha", "POST", { email: signupEmail });
  
      if (captchaResponse) {
        setSuccessMessage("Captcha, PLEASE GO AND VERIFY YOURSELF, IT MIGHT BE UNDER SPAM MESSAGES ON THE EMAIL SERVICE!");
        setcanCap(true);
      }
    } else {
      const signupResponse = await apiCall("http://localhost:5552/api/signup", "POST", {
        first: signupFirst,
        last: signupLast,
        email: signupEmail,
        password: signupPassword,
        phone: signupPhone,
        address: signupAddress, 
        captcha: signupCap,
      });
  
      if (signupResponse) {
        setSuccessMessage("Account created successfully!");
        setSignupEmail("");
        setSignupPassword("");
        setSignupFirst("");
        setSignupLast("");
        setSignupPhone("");
        setSignupAddress("");
        setSignupCap("");
        setcanCap(false);
      }
    }
    setTimeout(() => setIsCooldown(false), 3000)
  }    

  return (
    <div>
      <p>Don't have an account?</p>
      <Popup trigger={<button>Register</button>} modal nested>
        {(close) => (
           <div style={{ backgroundColor: "black", padding: "20px", borderRadius: "10px" }}>
            <form onSubmit={handleSignup}>
              {errors.global && <div className="alert">{errors.global}</div>}
              {successMessage && <div className="success">{successMessage}</div>}

              <h3>Complete the signup form</h3>
              <div>
                <label>First name:</label>
                <input
                  type="first"
                  value={signupFirst}
                  onChange={(e) => setSignupFirst(e.target.value)}
                />
                {errors.first && <div className="error">{errors.first}</div>}
              </div>

            <div>
                <label>Last name:</label>
                <input
                  type="last"
                  value={signupLast}
                  onChange={(e) => setSignupLast(e.target.value)}
                />
                {errors.last && <div className="error">{errors.last}</div>}
              </div>


              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                {errors.password && <div className="error">{errors.password}</div>}
              </div>

              <div>
                <label>phone:</label>
                <input
                  type="phone"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                />
                {errors.phone && <div className="error">{errors.phone}</div>}
              </div>


              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>

                
              <div>
                <label>Address</label>
                <input
                  type="address"
                  value={signupAddress}
                  onChange={(e) => setSignupAddress(e.target.value)}
                />
                {errors.address && <div className="error">{errors.address}</div>}
              </div>


              {canCap && 
              <div>
                <label>Enter captcha here:</label>
                  <input
                    type="cap"
                    value={signupCap}
                    onChange={(e) => setSignupCap(e.target.value)}
                  />
                  {errors.captcha && <div className="error">{errors.captcha}</div>}
              </div>}

              <button type="submit" onClick={handleSignup} disabled={isCooldown}>
                {isCooldown ? "Cooldown..." : "Sign Up"}
              </button>
            </form>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Popupad;