// aiRequest.js

const OpenAI = require("openai");
const { generateAntardarpanPrompt } = require("./promptTemplates");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Main function to call OpenAI API with user prompt and traits
 * @param {string} userName - Name of the user
 * @param {string} userPrompt - The message/question user typed
 * @param {string} traits - Final generated personality traits string
 * @param {string} language - Language in which user typed
 * @returns {Promise<string>} - AI friend response
 */
async function getAIResponse({ userName, userPrompt, traits, language = "English" }) {
  const fullPrompt = generateAntardarpanPrompt({ userName, userPrompt, traits, language });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are Antardarpan, an emotionally intelligent AI friend." },
      { role: "user", content: fullPrompt },
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = { getAIResponse };
