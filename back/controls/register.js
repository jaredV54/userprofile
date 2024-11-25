import { pool } from "../db.js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { transporter } from "../utils/transporter.js";
import { registrationInputValidation } from "../utils/registrationValidation.js";
dotenv.config();

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const register = async (req, res) => {
  const { credentials, basicInfo } = req.body;
  const { username, email, password } = credentials;
  const { firstname, middlename, lastname, gender, birthday } = basicInfo;
  const handleEmail = "SELECT * FROM user_credentials WHERE `email` = ?";
  
  pool.query(handleEmail, [email], async (err, emailData) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error. " + err });
    }

    if (emailData.length == 0) {
      const errors = registrationInputValidation({ ...credentials, ...basicInfo });
      if (!Object.values(errors).every((error) => error === '')) {
        return res.status(400).json({ inputError: errors, message: "Invalid inputs", success: false });
      }

      try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const verificationCode = generateVerificationCode();

        const insertTempData = `
          INSERT INTO temp_verification (email, username, firstname, lastname, middlename, gender, birthday, hashedPassword, verificationCode)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const values = [email, username, firstname, lastname, middlename, gender, birthday, hashedPassword, verificationCode ];

        pool.query(insertTempData, values, (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Internal error! " + err, success: false });
          }

          const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Email Verification Code',
            text: `Your verification code is: ${verificationCode}`
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ message: "Error sending verification email: " + error, success: false });
            }
            res.status(200).json({ message: "Verification code sent!", success: true, email: email });
          });
        });
      } catch (err) {
        res.status(500).json({ message: "Error processing registration: " + err, success: false });
      }
    } else {
      return res.status(400).json({ 
        inputError: { email: "Email already used!" }, 
        success: false 
    });
    }
  });
};

export const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  if (code.length !== 6) {
    return res.status(400).json({ message: "Please enter a verification code with exactly 6 characters.", success: false });
  }

  try {
    const [results] = await pool.promise().query("SELECT * FROM temp_verification WHERE verificationCode = ?", [code]);

    if (results.length > 0) {
      const tempData = results[0];
      if (tempData.email === email) {
        // Insert into user_basic_info and get the inserted ID
        const [basicInfoResult] = await pool.promise().query(
          `INSERT INTO user_basic_info (firstname, middlename, lastname, gender, birthday) 
           VALUES (?, ?, ?, ?, ?)`,
          [
            tempData.firstname,
            tempData.middlename || null,
            tempData.lastname,
            tempData.gender,
            tempData.birthday,
          ]
        );
        const userId = basicInfoResult.insertId;

        // Insert into user_credentials with the foreign key
        await pool.promise().query(
          `INSERT INTO user_credentials (userId, email, username, password) 
           VALUES (?, ?, ?, ?)`,
          [userId, email, tempData.username, tempData.hashedPassword]
        );

        // Delete from temp_verification
        await pool.promise().query("DELETE FROM temp_verification WHERE email = ?", [email]);

        // Respond with success
        return res.status(201).json({ message: "User registered successfully!", success: true });
      } else {
        return res.status(400).json({ message: "No verification data found for this email", success: false });
      }
    } else {
      return res.status(400).json({ message: "Invalid verification code", success: false });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal error! " + error, success: false });
  }
};

