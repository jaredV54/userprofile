import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/pages/LogIn.css";
import "../styles/ui/glass.css";
import Logo from "../assets/images/Logo.png";
import { useApiResponse } from '../hooks/useApiResonse';
import { loginApi } from '../api/handleLogin';

const LogInRoute = ({ values, setValues }) => {
    const navigate = useNavigate();
    const { notifMessage, setNotifMessage, inputErrors, setInputErrors } = useApiResponse();

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };

    const handleLogIn = (e) => {
      const payload = {
        values, 
        navigate, 
        setNotifMessage, 
        setInputErrors
      }
      
      loginApi(payload);
    };

    return (
    <>
    <div id="login_container">
            <div className="branding">
                <h1>
                    <img src={Logo} alt="logo" className="logo" />
                  RIGINAL
                </h1>
            <p>Your personalized space to manage, connect, and explore all features.</p>
        </div>

        <div className="login-box glass">
            <form>
                <label htmlFor="email">Email:</label>
                <input
                  className="login_input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="---"
                  value={values.email}
                  onChange={handleInputChange}
                />

                <label htmlFor="password" className="password">Password:</label>
                <input
                  className="login_input"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="---"
                  value={values.password}
                  onChange={handleInputChange}
                />

                <button type="button" onClick={handleLogIn} id="bttn_login" className="login-button bttn_login">Log In</button>
                <a href="#" className="forgot-password">Forgot password?</a>

                <button
                  type="button"
                  className="create-account-button bttn_login"
                  onClick={() => navigate("/register")}
                >
                  Create new account
                </button>
            </form>
        </div>
    </div>

    <footer>
        <ul>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Docs</li>
            <li>Contact Support</li>
            <li>Manage cookies</li>
            <li>Do not share my personal information</li>
        </ul>
    </footer>
    </>
  );
};

export default LogInRoute;