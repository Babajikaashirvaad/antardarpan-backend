const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getUserTraits = require('./traitEngine');

async function generateWelcomeMessage(userData) {
  const traits = getUserTraits(userData);
  const prompt = `Friendly tone, soft and wise. Your name is ${userData.aiName}, you are a helpful companion for ${userData.name}.
Based on the user's astrological, numerological, and MBTI-based traits (used internally), generate a welcome message.
Explain the user's past life and current purpose without explicitly mentioning astrology or MBTI.
Keep it emotionally warm and encouraging. End with something like "Ask me anything, I'm here."`;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4',
  });

  return chatCompletion.choices[0].message.content;
}

async function generateChatResponse(name, question) {
  const prompt = `Reply to ${name}'s question in a friendly, emotionally connected tone. Use soft wisdom from Indian scriptures or motivational quotes (non-copyright).
Avoid generic tone, use deep understanding, and sometimes address the user as 'mere dost' or 'my friend'. Question: "${question}"`;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4',
  });

  return chatCompletion.choices[0].message.content;
}

module.exports = { generateWelcomeMessage, generateChatResponse };
