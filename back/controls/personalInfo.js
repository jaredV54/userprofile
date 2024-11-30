import { pool } from "../db.js";
import path from "path";

const userProfilePictureDefault = path.resolve("uploads/user_default.png");

export const getUserPersonalInfo = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is not found! Please log in." });
  }

  const query = `
    SELECT 
      ubi.firstname,
      ubi.lastname,
      ubi.middlename,
      ubi.gender,
      ubi.birthday,
      upi.address
    FROM userprofile.user_basic_info ubi
    JOIN userprofile.user_personal_info upi ON upi.userId = ubi.id
    WHERE ubi.id = ?;
  `;


  pool.promise().query(query, [userId])
    .then(([rows]) => {
      if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const userInfo = rows[0];
      userInfo.profilePicture = userInfo.profilePicture || `${userProfilePictureDefault}`;

      res.status(200).json({ userInfo, success: true });
    })
    .catch((error) => {
      console.error("Error retrieving user personal info:", error);
      res.status(500).json({ message: "Internal server error while retrieving user info", error });
    });
};

export const updatePersonalInfo = (req, res) => {
    const { userId } = req.params; 
    const {
      address,
      firstname,
      lastname,
      middlename,
      gender,
      birthday,
    } = req.body; 
  
    console.log(userId, address, firstname, lastname, middlename, gender, birthday);
  
    const addressQuery = `
      UPDATE userprofile.user_personal_info
      SET 
        address = ?
      WHERE userId = ?;
    `;
  
    const basicInfoQuery = `
      UPDATE userprofile.user_basic_info
      SET 
        firstname = ?, 
        lastname = ?, 
        middlename = ?, 
        gender = ?, 
        birthday = ?
      WHERE id = ?;
    `;
  
    pool.promise()
      .query(addressQuery, [address, userId])
      .then(([addressResult]) => {
        if (addressResult.affectedRows === 0) {
          return res.status(404).json({ message: "User not found or no address change made" });
        }
  
        return pool.promise().query(basicInfoQuery, [firstname, lastname, middlename, gender, birthday, userId]);
      })
      .then(([basicInfoResult]) => {
        if (basicInfoResult.affectedRows === 0) {
          return res.status(404).json({ message: "User not found or no changes made in basic info" });
        }
  
        res.status(200).json({ message: "User personal info updated successfully!", success: true });
      })
      .catch((error) => {
        console.error("Error updating user personal info:", error);
        res.status(500).json({ message: "Error updating user info", error });
      });
};
  
