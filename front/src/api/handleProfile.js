import axios from "axios";
import Config from "../utils/config.json";
export const getUserPersonalInfoApi = async (payload) => {
    const { userId, setNotifMessage, setPersonalInfo } = payload;
    
    try {
      const response = await axios.get(`${Config.Configuration.database}/user-personal-info/${userId}`);
  
      if (response.data.success) {
        if (response.data.userInfo.birthday) {
          const birthdayDate = new Date(response.data.userInfo.birthday);
          const formattedBirthday = `${birthdayDate.getFullYear()}-${(birthdayDate.getMonth() + 1).toString().padStart(2, '0')}-${birthdayDate.getDate().toString().padStart(2, '0')}`;
          response.data.userInfo.birthday = formattedBirthday;  
        }
        console.log(response.data.userInfo)
  
        setPersonalInfo(response.data.userInfo); 
      } else {
        setNotifMessage({ error: "Failed to retrieve user information" });
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      setNotifMessage({ error: "Error fetching user information" });
    }
};

export const updateUserPersonalInfoApi = async (payload) => {
    const { personalInfo, setNotifMessage, userId } = payload;
    
    try {
      const response = await axios.put(`${Config.Configuration.database}/update/${userId}`, {
        ...personalInfo, 
      });
      console.log(response.data)
      if (response.data.success) {
        setNotifMessage({ success: "User information updated successfully!" });
      } else {
        setNotifMessage({ error: "Failed to update user information" });
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      setNotifMessage({ error: "Error updating user information" });
    }
};
  