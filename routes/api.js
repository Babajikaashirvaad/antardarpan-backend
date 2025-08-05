// File: clean-backend/routes/api.js (MBTI Submit with Traits Calculation & Save)

const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Chat = require('../model/Chat');
const { getAIResponse } = require('../utils/aiRequest');
const { buildAntardarpanPrompt } = require('../utils/promptEngine');

// Utility: Dummy Trait Mapping Logic (Naadi Shastra + Numerology Inspired)
function deriveTraits(mbtiType, dob) {
  // Dummy traits mapping logic (replace with real mapping if needed)
  const numerologyInfluence = parseInt(dob.split('-')[2]) % 3;
  const mbtiPatterns = {
    INFJ: { strengths: ['Empathetic', 'Insightful'], blindSpots: ['Overthinking'] },
    ENFP: { strengths: ['Creative', 'Energetic'], blindSpots: ['Easily Distracted'] },
    ISTJ: { strengths: ['Disciplined', 'Reliable'], blindSpots: ['Emotionally Reserved'] }
  };
  const traits = mbtiPatterns[mbtiType] || { strengths: ['Adaptive'], blindSpots: ['Inconsistent'] };

  if (numerologyInfluence === 0) traits.strengths.push('Natural Healer');
  if (numerologyInfluence === 1) traits.strengths.push('Visionary Thinker');
  if (numerologyInfluence === 2) traits.strengths.push('Grounded Realist');

  return traits;
}

// Save MBTI and Traits
router.post('/saveUserMBTI', async (req, res) => {
  const { userId, mbtiResponses } = req.body;
  const mbtiType = calculateMBTI(mbtiResponses);
  const user = await User.findById(userId);

  const derivedTraits = deriveTraits(mbtiType, user.dob);

  await User.findByIdAndUpdate(userId, { mbtiType, traits: derivedTraits });
  res.json({ success: true });
});

// Dummy MBTI Scoring Logic
function calculateMBTI(responses) {
  // Placeholder logic (replace with actual MBTI calculation)
  return 'INFJ';
}

// Chat API (Fetching Stored Traits)
router.post('/chat', async (req, res) => {
  const { userId, userQuery } = req.body;
  const user = await User.findById(userId);
  const prompt = buildAntardarpanPrompt({
    name: user.name,
    dob: user.dob,
    traits: user.traits,
    query: userQuery,
    category: user.category,
    subCategory: user.subCategory,
    language: user.language
  });

  const aiResponse = await getAIResponse(prompt);
  const chat = new Chat({ userId, userQuery, aiResponse });
  await chat.save();

  res.json({ aiResponse });
});

module.exports = router;
