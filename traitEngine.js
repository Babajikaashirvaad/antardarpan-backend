function getUserTraits(userData) {
  const mbtiMap = {
    Introvert: 'Reflective and calm',
    Extrovert: 'Expressive and vibrant',
    Judging: 'Structured and analytical',
    Perceiving: 'Flexible and spontaneous'
  };

  const mbtiTraits = userData.mbtiResponses.map(ans => mbtiMap[ans] || '').filter(Boolean).join(', ');

  return {
    name: userData.name,
    aiFriendName: userData.aiName || '',
    personality: mbtiTraits,
    strengths: ['Empathetic', 'Insightful'],
    weaknesses: ['Overthinker'],
    purpose: 'Guide others with compassion and inner strength',
  };
}

module.exports = getUserTraits;
