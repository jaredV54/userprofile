import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../context/ProfileContext";
import profilePic from "../../assets/images/user_default.png";
import { Notif } from "../ui/Notif";

const Profile = () => {
  const { personalInfo, updateProfile, setPersonalInfo, setNotifMessage, notifMessage } = useProfile();
  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  const handleSaveProfile = () => {
    updateProfile();
    setIsEditable(false); 
  };

  return (
    <>
    <Notif notifMessage={notifMessage} setNotifMessage={setNotifMessage} />
    <div className="profile-page">
      <button onClick={() => navigate("/home")}>Home</button>
      <h2>Profile</h2>
      <div>
        <img src={profilePic} alt="profile picture" />
      </div>
      <form>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            value={personalInfo.firstname || ""}
            onChange={handleInputChange}
            disabled={!isEditable}
            style={{ backgroundColor: isEditable ? "white" : "#f0f0f0" }}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={personalInfo.lastname || ""}
            onChange={handleInputChange}
            disabled={!isEditable}
            style={{ backgroundColor: isEditable ? "white" : "#f0f0f0" }}
          />
        </div>
        <div>
          <label>Middle Name:</label>
          <input
            type="text"
            name="middlename"
            value={personalInfo.middlename || ""}
            onChange={handleInputChange}
            disabled={!isEditable}
            style={{ backgroundColor: isEditable ? "white" : "#f0f0f0" }}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={personalInfo.gender || ""}
            onChange={handleInputChange}
            disabled={!isEditable}
            style={{ backgroundColor: isEditable ? "white" : "#f0f0f0" }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label>Birthday:</label>
          <input
            type="date"
            name="birthday"
            value={personalInfo.birthday || ""}
            onChange={handleInputChange}
            disabled={!isEditable}
            style={{ backgroundColor: isEditable ? "white" : "#f0f0f0" }}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={personalInfo.address || ""}
            onChange={handleInputChange}
            disabled={!isEditable}
            style={{ backgroundColor: isEditable ? "white" : "#f0f0f0" }}
          />
        </div>
        <div>
          <button type="button" onClick={toggleEditMode}>
            {isEditable ? "Cancel" : "Edit"}
          </button>
          {isEditable && (
            <button type="button" onClick={handleSaveProfile}>
              Save
            </button>
          )}
        </div>
      </form>
    </div>
    </>
  );
};

export default Profile;
