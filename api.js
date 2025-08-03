const express = require('express');
const router = express.Router();
const { generateWelcomeMessage, generateChatResponse } = require('./promptGenerator');

router.post('/api/welcome', async (req, res) => {
  const { name, dob, tob, pob, aiName, aiGender, mbtiAnswers } = req.body;
  try {
    const response = await generateWelcomeMessage({ name, dob, tob, pob, aiName, aiGender, mbtiAnswers });
    res.json({ message: response });
  } catch (error) {
    console.error('Error in welcome:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/api/chat', async (req, res) => {
  const { name, question } = req.body;
  try {
    const response = await generateChatResponse(name, question);
    res.json({ answer: response });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
