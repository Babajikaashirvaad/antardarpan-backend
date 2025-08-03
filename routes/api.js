const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ GET Route for API Health Check
router.get('/welcome', (req, res) => {
  res.send('Welcome to Antardarpan API');
});

// POST Route for Welcome Analysis
router.post('/welcome', async (req, res) => {
  try {
    const { userDetails, mbtiResponses } = req.body;

    const prompt = `
User Details:
Name: ${userDetails.name}
DOB: ${userDetails.dob}
TOB: ${userDetails.tob || 'Unknown'}
POB: ${userDetails.pob || 'Unknown'}
MBTI Responses: ${mbtiResponses.join(', ')}

You are an expert life coach. Analyze the above details and reply ONLY in this format:

Welcome Message: <short welcome message>
Past Life: <brief past life summary>
Current Life Purpose: <brief current life purpose summary>

Do not add any extra explanation or text.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    });

    const aiResponse = completion.choices[0].message.content;

    // Parsing AI Response
    const welcomeMatch = aiResponse.match(/Welcome Message:\s*(.*)/i);
    const pastLifeMatch = aiResponse.match(/Past Life:\s*(.*)/i);
    const lifePurposeMatch = aiResponse.match(/Current Life Purpose:\s*(.*)/i);

    res.json({
      message: welcomeMatch ? welcomeMatch[1].trim() : 'Welcome!',
      pastLife: pastLifeMatch ? pastLifeMatch[1].trim() : 'Could not determine',
      currentLifePurpose: lifePurposeMatch ? lifePurposeMatch[1].trim() : 'Could not determine',
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process analysis' });
  }
});

// POST Route for Chat Responses
router.post('/chat', async (req, res) => {
  try {
    const { userDetails, mbtiResponses, question } = req.body;

    const prompt = `
You are Antardarpan, a personal AI mentor.
User Details:
Name: ${userDetails.name}
DOB: ${userDetails.dob}
MBTI Responses: ${mbtiResponses.join(', ')}

User's Question:
${question}

Based on user's traits and context, reply in a friendly conversational tone. Give practical, personalized advice.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    });

    const aiReply = completion.choices[0].message.content;

    res.json({ reply: aiReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate AI reply' });
  }
});

module.exports = router;
