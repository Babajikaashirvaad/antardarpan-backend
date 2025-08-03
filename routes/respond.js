const express = require('express');
const router = express.Router();
const { generateChatResponse } = require('../promptGenerator');
const getUserTraits = require('../traitEngine');

router.post('/', async (req, res) => {
  const { name, question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    const traits = getUserTraits({ name });
    const aiResponse = await generateChatResponse(name, question);

    return res.json({
      response: aiResponse,
      traits
    });
  } catch (error) {
    console.error('Error generating AI response:', error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
});

module.exports = router;
