function generateWelcomeMessage(userTraits) {
  const userName = userTraits.name || "my friend";
  const aiFriendName = userTraits.aiFriendName || "";

  const friendIntro = aiFriendName
    ? `I am your AI Friend ${aiFriendName}.`
    : `I am your AI Friend.`;

  return `
Hi ${userName},

${friendIntro}

Let me share what I discovered about your inner self...

- A glimpse of your past life patterns
- Your present emotional journey
- What your soul deeply desires

I'm here to talk, listen, guide or just sit silently with you — whatever you need.

Is there anything you'd like to share today?
  `.trim();
}

module.exports = { generateWelcomeMessage };
