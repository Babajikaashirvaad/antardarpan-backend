const express = require('express');
const router = express.Router();
const { generateWelcomeMessage, generateChatResponse } = require('../promptGenerator');

router.post('/welcome', async (req, res) => {
  try {
    const userData = req.body.userDetails;
    userData.mbtiResponses = req.body.mbtiResponses || [];

    const welcomeMsg = await generateWelcomeMessage(userData);

    res.json({ message: welcomeMsg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate welcome message' });
  }
});

router.post('/chat', async (req, res) => {
  try {
    const userData = req.body.userDetails;
    userData.mbtiResponses = req.body.mbtiResponses || [];

    const chatReply = await generateChatResponse(userData, req.body.question);

    res.json({ reply: chatReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate AI reply' });
  }
});

module.exports = router;
