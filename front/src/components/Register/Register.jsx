import React from 'react';
import { useRegister } from '../../context/RegisterContext';
import "../../styles/ui/filteredBG1.css";
import Logo from '../../assets/images/Logo.png';
import { Notif } from '../ui/Notif';
import { useApiResponse } from '../../hooks/useApiResonse';
import OTPverification from './OTP';
import { useNavigate } from 'react-router-dom';
import ChooseBttn from '../ui/ChooseBttn';

const Register = () => {
  const { user, updateCredentials, updateBasicInfo, handleSubmit, setOTP, OTP, 
    notifMessage, setNotifMessage, inputErrors, setInputErrors 
   } = useRegister();
  const { } = useApiResponse();
  const navigate = useNavigate();

  const handleInputChange = (updateFunction, field) => (e) => {
    updateFunction(field, e.target.value);
  };

  const handleGenderSelect = (gender) => {
    updateBasicInfo('gender', gender);
  };

  return (
    <>
      <Notif notifMessage={notifMessage} setNotifMessage={setNotifMessage} />

      <div className='register_header'>
        <img src={Logo} alt="logo" className='logo_register' />
        <h1>Create new account</h1>
      </div>

      <div>
        <p>Already have an account?</p>
        <ChooseBttn 
          singleBttn={true}
          singleBttnLabel={"Log In"} 
          singleBttnFunc={() => navigate("/")}
        />
      </div>

      <main>
        <form id='register_form'>
          {/* Personal Info Section */}
          <section>
            <h3>Personal Info</h3>

            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              value={user.basicInfo.firstname}
              onChange={handleInputChange(updateBasicInfo, 'firstname')}
            />

            <label htmlFor="middle_name">Middle Name: <span>(optional)</span></label>
            <input
              type="text"
              id="middle_name"
              value={user.basicInfo.middlename}
              onChange={handleInputChange(updateBasicInfo, 'middlename')}
            />

            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              value={user.basicInfo.lastname}
              onChange={handleInputChange(updateBasicInfo, 'lastname')}
            />

            <label htmlFor="gender">Gender:</label>
            <div>
              <button
                type="button"
                className={user.basicInfo.gender === 'Male' ? 'active' : ''}
                onClick={() => handleGenderSelect('Male')}
              >
                Male
              </button>
              <button
                type="button"
                className={user.basicInfo.gender === 'Female' ? 'active' : ''}
                onClick={() => handleGenderSelect('Female')}
              >
                Female
              </button>
              <button
                type="button"
                className={user.basicInfo.gender === 'Other' ? 'active' : ''}
                onClick={() => handleGenderSelect('Other')}
              >
                Other
              </button>
            </div>

            <label htmlFor="date_of_birth">Date of Birth:</label>
            <input
              type="date"
              id="date_of_birth"
              value={user.basicInfo.birthday}
              onChange={handleInputChange(updateBasicInfo, 'birthday')}
            />
          </section>

          {/* Account Credentials Section */}
          <section>
            <h3>Account Credentials</h3>

            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={user.credentials.username}
              onChange={handleInputChange(updateCredentials, 'username')}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={user.credentials.email}
              onChange={handleInputChange(updateCredentials, 'email')}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={user.credentials.password}
              onChange={handleInputChange(updateCredentials, 'password')}
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={user.credentials.confirm_password}
              onChange={handleInputChange(updateCredentials, 'confirm_password')}
            />

            <ChooseBttn 
            singleBttn={true}
            singleBttnLabel={"Verify Email"} 
            singleBttnFunc={() => handleSubmit()}
            />
          </section>
        </form>
      </main>

      {OTP.showOTPVerification &&
        <OTPverification 
        navigate={navigate} 
        email={user.credentials.email} 
        setOTP={setOTP} 
        user={user} 
        OTP={OTP} 
        setNotifMessage={setNotifMessage} 
        setInputErrors={setInputErrors}
      />
      }

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

export default Register;
