import { pool } from "../db.js";
export const getUserProfileMod = async (userId) => {
  try {
    const query = 'SELECT * FROM user_files WHERE userId = ?';
    const [rows] = await pool.promise().execute(query, [userId]); 
    return rows;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; 
  }
};

export const insertFileMod = async (userId, fileName, originalFileName, fileType, fileSize) => {
  try {
    const query = `
      INSERT INTO user_files (userId, file_path, original_filename, file_type, file_size)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.promise().execute(query, [userId, fileName, originalFileName, fileType, fileSize]);
    return result;
  } catch (error) {
    console.error('Error saving file to the database:', error);
    throw error;
  }
};

export const removeFileMod = async (fileId) => {
    try {
      const query = 'DELETE FROM user_files WHERE id = ?';
      const [result] = await pool.promise().execute(query, [fileId]); 
      return result;  
    } catch (error) {
      console.error('Error removing file from database:', error);
      throw error;
    }
};
  
  