import { pool } from "../db.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { logInValidation } from "../utils/logInValidation.js";
dotenv.config();

export const logoutUser = (req, res) => {
    res.clearCookie('auth_token', { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.clearCookie('refresh_token', { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(200).json({ message: 'Logged out successfully' });
};  

const generateAccessToken = (user) => {
  return jwt.sign({ 
    userId: user.id, 
    firstName: user.firstname, 
    lastname: user.lastname,
    middlename: user.middlename 
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ 
    userId: user.id, 
    firstName: user.firstname, 
    lastname: user.lastname,
    middlename: user.middlename 
  }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); 
};

export const userLogin = (req, res) => {
  const handleEmail = "SELECT * FROM user_credentials WHERE `email` = ?";

  pool.query(handleEmail, [req.body.email], async (err, emailData) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error. " + err });
    }

    if (emailData.length > 0) {
      const values = { email: req.body.email, password: req.body.password };
      const password = req.body.password;
      const errors = logInValidation(values);
      const user = emailData[0];

      if (errors.email || errors.password) {
        return res.status(400).json({ inputError: errors });
      }

      try {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);

          res.cookie('auth_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict'
          });

          res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict'
          });

          return res.status(200).json({
            message: "Login successful",
            data: {
              userType: user.userType,
              userId: user.id,
              firstName: user.firstname
            },
            success: true
          });
        } else {
          return res.status(400).json({ inputError: { password: "Incorrect password" }, success: false });
        }
      } catch (error) {
        return res.status(500).json({ error: "Error comparing passwords. " + error, success: false });
      }

    } else {
      return res.status(400).json({ inputError: { email: "Email doesn't exist" }, success: false });
    }
  });
};

export const verifyToken = (req, res) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.log('Token expired');
        return res.status(401).json({ message: 'Token expired' });
      } else {
        console.log('Failed to authenticate token:', err);
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
    }

    const userId = decoded.userId;

    const getUserQuery = `
      SELECT c.id, b.firstname, b.lastname, b.middlename, c.username, c.userId 
      FROM user_credentials c 
      JOIN user_basic_info b ON c.userId = b.id 
      WHERE c.id = ?;
    `;

    pool.query(getUserQuery, [userId], (err, userData) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: "Internal server error" });
      }

      
      if (userData.length > 0) {
        const user = userData[0];
        return res.json({ 
          id: user.id,
          userId: user.userId, 
          firstName: user.firstname, 
          lastname: user.lastname,
          middlename: user.middlename,
          username: user.username
        });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    });
  });
};

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  console.log('Refresh token received:', refreshToken);

  if (!refreshToken) {
    console.log('No refresh token provided');
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('Invalid refresh token:', err.message);
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const accessToken = generateAccessToken({
      userId: user.userId, 
      firstName: user.firstName, 
      lastname: user.lastname,
      middlename: user.middlename 
    });

    console.log('New access token generated:', accessToken);

    res.cookie('auth_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict'
    });

    return res.json({ accessToken });
  });
};
