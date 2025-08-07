const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const promptGenerator = require('./promptGenerator');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ GET route for testing (browser health check)
app.get('/api/welcome', (req, res) => {
  res.status(200).json({ message: 'Welcome to Antardarpan API (GET)' });
});

// ✅ POST route for testing (actual flow)
app.post('/api/welcome', (req, res) => {
  res.status(200).json({ message: 'Welcome to Antardarpan API (POST)' });
});

// ✅ Chat endpoint (core AI logic)
app.post('/api/chat', async (req, res) => {
  try {
    const { userDetails, userQuestion } = req.body;

    if (!userDetails || !userQuestion) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const prompt = promptGenerator(userDetails, userQuestion);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
