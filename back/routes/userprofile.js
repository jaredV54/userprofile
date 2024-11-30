import express from 'express';
const router = express.Router();
import { uploadFile, removeFile, getFiles, downloadFile } from '../controls/userprofile.js';

router.post('/upload', uploadFile);
router.delete('/remove/:fileId', removeFile);
router.get('/files/:userId', getFiles);
router.get('/files/download/:filename', downloadFile);

export default router;
