const express = require('express');
const router = express.Router();
const getUserTraits = require('../traitEngine');
const { generateWelcomeMessage } = require('../welcomeGenerator');

router.post('/', (req, res) => {
  const userData = req.body;
  const traits = getUserTraits(userData);

  const pastLife = "You were a spiritual seeker with deep emotional intelligence.";
  const currentLifePurpose = "Your mission is to guide others towards self-awareness and inner peace.";

  const welcomeMessage = generateWelcomeMessage({
    name: userData.name,
    aiFriendName: userData.aiName
  });

  return res.json({
    pastLife,
    currentLifePurpose,
    welcomeMessage,
    traits
  });
});

module.exports = router;
