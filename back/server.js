import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import registerRoutes from './routes/register.js';
import loginRoutes from './routes/login.js';
import userprofile from './routes/userprofile.js';
import personalInfo from './routes/personalInfo.js';
// const __dirnameBackend = path.resolve();
// const __dirnameFrontend = path.resolve(__dirnameBackend, '..', 'front');

const app = express();
app.use(cors({ 
  origin: 'http://localhost:5173',
  credentials: true, 
}));
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.json());
app.use(cookieParser());

app.use(registerRoutes);
app.use(loginRoutes);
app.use(userprofile);
app.use(personalInfo);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
//app.use(express.static(path.resolve(__dirnameFrontend, 'dist')));

const PORT = process.env.PORT || 8085;
app.get('/', (req, res) => {
  res.send(`Server is running : ${PORT}`);
});

/* app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirnameFrontend, 'build', 'index.html'));
}); */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});