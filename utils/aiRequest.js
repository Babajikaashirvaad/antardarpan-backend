// File: clean-backend/utils/aiRequest.js

const axios = require('axios');

const getAIResponse = async (prompt) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are Antardarpan, an emotionally intelligent AI mentor.' },
        { role: 'user', content: prompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    return 'Sorry, I am facing some issues right now. Please try again later.';
  }
};

module.exports = { getAIResponse };
