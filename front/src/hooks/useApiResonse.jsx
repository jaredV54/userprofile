import { useState } from 'react';

export const useApiResponse = () => {
  const [inputErrors, setInputErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    gender: "",
    birthday: "",
    file_size: "",
  });

  const [notifMessage, setNotifMessage] = useState({
    loading: false,
    message: "",
    error: "",
    success: ""
  });

  return { inputErrors, setInputErrors, notifMessage, setNotifMessage };
};
