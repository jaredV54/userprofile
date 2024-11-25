import axios from 'axios';
import Config from "../utils/config.json";
import { useApiError } from '../hooks/useApiError';

axios.defaults.withCredentials = true;

export const loginApi = (req) => {
  const { values, navigate, setNotifMessage, setInputErrors } = req;
  console.log(values)
  axios.post(`${Config.Configuration.database}/login`, values)
    .then((res) => {
      if (res.data) {
        if (res.data.success || res.status === 200) {
          navigate('/userprofile');
        }
      }
    })
    .catch((error) => {
      const inputError = error.response.data?.inputError || "";
      if (inputError) {
        setInputErrors(inputError)
        useApiError(error, setNotifMessage)
      } else {
        useApiError(error, setNotifMessage)
      }
    })
};