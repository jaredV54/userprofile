import axios from "axios";
import Config from "../utils/config.json";
import { useApiError } from "../hooks/useApiError";
export const verifyEmailApi = async (payload) => {
  const { setNotifMessage, setInputErrors, user, setOTP } = payload;
    try {
      const response = await axios.post(`${Config.Configuration.database}/register`, { ...user });
      console.log(response.data)
      if (response.status === 201 || response.data.success) {
        setOTP((prev) => ({...prev, showOTPVerification: true}))
        setNotifMessage((prev) => ({...prev, success: response.data.message}))
      }
    } catch(error) {
      if (error.response) {
        const inputError = error.response.data.inputError;
        setInputErrors(inputError)
        useApiError(error, setNotifMessage)
        return;
      } 
      useApiError(error, setNotifMessage)
    }
}

export const verifyOTPApi = async (payload) => {
  const { verificationCode, email, setOTP, setNotifMessage } = payload;
  try {
    const response = await axios.post(`${Config.Configuration.database}/verify-code`, { email: email, code: verificationCode})
    console.log(response.data, response.status)
    if (response.data.success || response.status === 201) {
      setOTP((prev) => ({...prev, registered: true}))
      setNotifMessage(prev => ({...prev, success: response.data.message})) 
    }
  } catch(error) {
    console.log(error)
    useApiError(error, setNotifMessage)
  } 
}