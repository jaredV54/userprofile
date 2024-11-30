import { insertFileMod, removeFileMod } from '../models/userprofileModel.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { pool } from '../db.js';
import { fileURLToPath } from 'url';

const upload = multer({
  dest: 'uploads/', 
  limits: { fileSize: 5 * 1024 * 1024 }, 
}).single('file');

export const uploadFile = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File size exceeds 5MB!' });
        }
        return res.status(500).json({ message: 'Error uploading file', error: err });
      }
  
      const { userId } = req.body;
  
      if (!userId || !req.file) {
        return res.status(400).json({ message: 'Missing userId or file' });
      }
  
      try {
        const newProfile = await insertFileMod(
          userId,
          req.file.filename,        
          req.file.originalname,    
          req.file.mimetype,        
          req.file.size             
        );
  
        res.status(201).json({ message: 'File uploaded successfully', file: newProfile, success: true });
      } catch (error) {
        res.status(500).json({ message: 'Error saving file to the database', success: false, error });
      }
    });
};

export const removeFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const fileRecord = await removeFileMod(fileId);

    if (fileRecord.affectedRows === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.status(200).json({ message: 'File removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing file', error });
  }
};

export const getFiles = async (req, res) => {
  const { userId } = req.params; 

  try {
    const query = 'SELECT * FROM user_files WHERE userId = ?';
    const [rows] = await pool.promise().execute(query, [userId]); 

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No files found' });
    }

    const filesWithReadableSize = rows.map((file) => ({
      ...file,
      file_size: convertFileSize(file.file_size),
    }));

    res.status(200).json({
      success: true,
      files: filesWithReadableSize,
    });
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).json({ message: 'Error retrieving files from the database', error });
  }
};


const convertFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`; 
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`; 
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`; 
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`; 
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadFile = async (req, res) => {
  const { filename } = req.params;

  try {
    const query = 'SELECT * FROM user_files WHERE userId = ? WHERE original_filename = ?';
    const [rows] = await pool.promise().execute(query, [filename]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    const file = rows[0];
    const filePath = path.join(__dirname, '..', 'uploads', file.file_path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on the server' });
    }

    res.sendFile(filePath);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error downloading file' });
  }
};