import express from 'express';
import { postNotification , totalNotifications } from '../controllers/notifyController.js';

const router = express.Router();
router.post('/', postNotification);
router.get('/', totalNotifications);


export default router;
