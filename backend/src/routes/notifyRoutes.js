import express from 'express';
import { postNotification } from '../controllers/notifyController.js';

const router = express.Router();
router.post('/', postNotification);


export default router;
