import mysql from 'mysql2';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export const pool = mysql.createPool({
  host: 'localhost', // Database host (usually '127.0.0.1' or 'localhost')
  user: 'root', // Database user (default is 'root' or your chosen username)
  password: '4hq183kl', // Database password (the one you used during setup)
  database: 'userprofile', // Name of the database
  waitForConnections: true, // Allow the pool to queue connection requests when no connections are available
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0 // No limit for queued connection requests
});

// For Accessing Remote Database

/* export const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}); */