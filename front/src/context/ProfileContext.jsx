import React, { createContext, useContext, useEffect, useState } from "react";
import { useApiResponse } from "../hooks/useApiResonse";
import { getUserPersonalInfoApi, updateUserPersonalInfoApi } from "../api/handleProfile";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children, userId }) => {
  const [personalInfo, setPersonalInfo] = useState({
    address: "",
    firstName: "",
    lastName: "",
    middleName: "",
    gender: "",
    birthday: "",
  });
  

  const { setNotifMessage, notifMessage } = useApiResponse();

  const updateProfile = () => {
    const payload = {
      personalInfo,
      setNotifMessage,
      userId,
    };

    updateUserPersonalInfoApi(payload);
  };

  useEffect(() => {
    const payload = {
      userId,
      setPersonalInfo,
      setNotifMessage,
    };

    getUserPersonalInfoApi(payload);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        updateProfile,
        personalInfo,
        setPersonalInfo,
        setNotifMessage, 
        notifMessage
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
