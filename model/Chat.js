// File: clean-backend/models/Chat.js (Chat Expiry Time Logic Added)

const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userQuery: { type: String, required: true },
  aiResponse: { type: String, required: true },
  expiryTime: { type: Date } // Dynamic Expiry Time per User Choice
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
