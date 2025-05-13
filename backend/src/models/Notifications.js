import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'warning', 'error'], required: true },
  timestamp: { type: Date, default: Date.now }
});

export  const Notification = mongoose.model('Notification', notificationSchema);
