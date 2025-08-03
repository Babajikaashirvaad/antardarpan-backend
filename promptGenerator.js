const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getUserTraits = require('./traitEngine');
const { generateAntardarpanPrompt } = require('./promptTemplates');
const { generateWelcomeMessage: staticWelcomeMessage } = require('./welcomeGenerator');

async function generateWelcomeMessage(userData) {
  const traits = getUserTraits(userData);

  const prompt = `
You are Antardarpan, a personal AI mentor.

User Details:
Name: ${traits.name}
Traits: ${traits.personality}, Strengths: ${traits.strengths.join(', ')}, Life Purpose: ${traits.purpose}

Generate a Welcome Message:
1. Glimpse of user's past life patterns.
2. Present emotional journey reflection.
3. Soul's current desire.
4. End with: "Is there anything you'd like to share today?"

Tone: Friendly, poetic, emotional, spiritually grounded.
  `;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4o',
  });

  return chatCompletion.choices[0].message.content;
}

async function generateChatResponse(userData, question) {
  const traits = getUserTraits(userData);

  const prompt = generateAntardarpanPrompt({
    userName: userData.name,
    userPrompt: question,
    traits: JSON.stringify(traits),
    language: 'English'
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4o',
  });

  return chatCompletion.choices[0].message.content;
}

module.exports = { generateWelcomeMessage, generateChatResponse };
