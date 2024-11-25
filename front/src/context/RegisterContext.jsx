import React, { createContext, useContext, useEffect, useState } from 'react';
import { verifyEmailApi } from '../api/handleRegister';
import { useApiResponse } from '../hooks/useApiResonse';

const RegisterContext = createContext();

export const useRegister = () => useContext(RegisterContext);

export const RegisterProvider = ({ children }) => {
  const [user, setUser] = useState({
    credentials: {
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    basicInfo: {
      firstname: '',
      lastname: '',
      middlename: '',
      gender: '',
      birthday: ''
    }
  });

  const { notifMessage, setNotifMessage, inputErrors, setInputErrors  } = useApiResponse();
  const updateCredentials = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      credentials: {
        ...prevUser.credentials,
        [field]: value,
      },
    }));
  };

  const [OTP, setOTP] = useState({
    registered: false,
    showOTPVerification: false
  });

  const updateBasicInfo = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      basicInfo: {
        ...prevUser.basicInfo,
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
    const payload = {
      setOTP,
      user,
      setNotifMessage,
      setInputErrors
    };

    verifyEmailApi(payload)
  };

  return (
    <RegisterContext.Provider
      value={{
        user,
        updateCredentials,
        updateBasicInfo,
        handleSubmit,
        OTP, 
        setOTP,
        notifMessage, 
        setNotifMessage,
        inputErrors,
        setInputErrors 
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
