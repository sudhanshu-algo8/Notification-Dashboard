import { Notification}  from '../models/Notifications.js';
import { broadcastNotification } from '../sockets/socketManager.js';
import { validatePayload } from '../utils/validatePayload.js';

export const postNotification = async (req, res) => {
  const { title, message, type } = req.body;

  const error = validatePayload(req.body);
  if (error) return res.status(400).json({ error });

  try {
    const notification = new Notification({ title, message, type });
    const savedNotification = await notification.save();

    broadcastNotification(savedNotification);

    res.status(201).json({ success: true, notification: savedNotification });
  } catch (err) {
    res.status(500).json({ error: 'Server error while saving notification.' });
  }
};
