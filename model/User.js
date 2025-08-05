// File: clean-backend/models/User.js (TOB & Place Removed — Final Naadi Numerology Flow)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  language: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },
  mbtiType: { type: String },
  traits: {
    strengths: [String],
    blindSpots: [String]
  },
  isPaidUser: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
