import React from 'react';
import { RegisterProvider } from '../context/RegisterContext.jsx';
import Register from '../components/Register/Register.jsx';

const RegisterRoute = () => {
  return (
    <RegisterProvider>
      <Register />
    </RegisterProvider>
  );
};

export default RegisterRoute;
