import React from 'react';
import { useRegister } from '../../context/RegisterContext';
import "../../styles/ui/filteredBG1.css";
import "../../styles/ui/filteredBG2.css";
import Logo from '../../assets/images/Logo.png';
import Mountain from '../../assets/images/Mountain.jpg';
import { Notif } from '../ui/Notif';
import { FilteredBG } from '../ui/FilteredBG';
import OTPverification from './OTP';
import { useNavigate } from 'react-router-dom';
import "../../styles/pages/Register.css";
//import "../../styles/pages/LogIn.css";

const Register = () => {
  const { user, updateCredentials, updateBasicInfo, handleSubmit, setOTP, OTP, 
    notifMessage, setNotifMessage, inputErrors, setInputErrors 
   } = useRegister();
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
      <FilteredBG optionNo={2} />
      <div className='register_wrapper'>

      <div className='register_header'>
        <img src={Logo} alt="logo" className='logo_register' />
        <h5>Register</h5>
        <div className='mount_img_wrap'>
          <img src={Mountain} alt="Mountain img" />
        </div>
        <h6>Your journey begin here! Build your profile in seconds.</h6>
      </div>

      <div className='login_account'>
        <p>Already have an account?</p>
        <div onClick={() => navigate("/")}>Log in<i className="bx bx-right-arrow-alt"></i></div>
      </div>

      <main>
        <form id='register_form' className={
          (OTP.showOTPVerification ? "register_form_wrapper_out" : "") + " register_form_wrapper glass"
          }>
          {/* Personal Info Section */}
          <section>
            <h3>User Information</h3>

            <label htmlFor="first_name">First Name: <span>{inputErrors.firstname}</span></label>
            <input
              type="text"
              id="first_name"
              placeholder='---'
              className='login_input'
              value={user.basicInfo.firstname}
              onChange={handleInputChange(updateBasicInfo, 'firstname')}
            />

            <label htmlFor="middle_name">Middle Name: (optional) <span>{inputErrors.middlename}</span></label>
            <input
              type="text"
              id="middle_name"
              className='login_input'
              placeholder='---'
              value={user.basicInfo.middlename}
              onChange={handleInputChange(updateBasicInfo, 'middlename')}
            />

            <label htmlFor="last_name">Last Name: <span>{inputErrors.lastname}</span></label>
            <input
              type="text"
              id="last_name"
              placeholder='---'
              className='login_input'
              value={user.basicInfo.lastname}
              onChange={handleInputChange(updateBasicInfo, 'lastname')}
            />

            <label htmlFor="gender">Gender: <span>{inputErrors.gender}</span></label>
            <div className='gender_container'>
              <button
                type="button"
                className={user.basicInfo.gender === 'Male' ? 'bttn_active' : ''}
                onClick={() => handleGenderSelect('Male')}
              >
                Male
              </button>
              <button
                type="button"
                className={user.basicInfo.gender === 'Female' ? 'bttn_active' : ''}
                onClick={() => handleGenderSelect('Female')}
              >
                Female
              </button>
              <button
                type="button"
                className={user.basicInfo.gender === 'Other' ? 'bttn_active' : ''}
                onClick={() => handleGenderSelect('Other')}
              >
                Other
              </button>
            </div>

            <label htmlFor="date_of_birth">Date of Birth: <span>{inputErrors.birthday}</span></label>
            <input
              type="date"
              id="date_of_birth"
              className='login_input'
              value={user.basicInfo.birthday}
              onChange={handleInputChange(updateBasicInfo, 'birthday')}
            />
          </section>

          {/* Account Credentials Section */}
          <section>
            <h3>Account Credentials</h3>

            <label htmlFor="username">Username: <span>{inputErrors.username}</span></label>
            <input
              type="text"
              id="username"
              placeholder='---'
              className='login_input'
              value={user.credentials.username}
              onChange={handleInputChange(updateCredentials, 'username')}
            />

            <label htmlFor="email">Email: <span>{inputErrors.email}</span></label>
            <input
              type="email"
              className='login_input'
              placeholder='---'
              id="email"
              value={user.credentials.email}
              onChange={handleInputChange(updateCredentials, 'email')}
            />

            <label htmlFor="password">Password: <span>{inputErrors.password}</span></label>
            <input
              type="password"
              placeholder='---'
              className='login_input'
              id="password"
              value={user.credentials.password}
              onChange={handleInputChange(updateCredentials, 'password')}
            />

            <label htmlFor="confirmPassword">Confirm Password: <span>{inputErrors.confirm_password}</span></label>
            <input
              type="password"
              placeholder='---'
              id="confirmPassword"
              className='login_input'
              value={user.credentials.confirm_password}
              onChange={handleInputChange(updateCredentials, 'confirm_password')}
            />

            <button type='button' className='login-button bttn_login' onClick={handleSubmit}>Verify Email</button>
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

export default Register;
