const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const moodMap = {
  happy: "🙂",
  sad: "😔",
  stressed: "😔",
  angry: "😡",
  neutral: "🙂",
};

async function classifyMood(text) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const sanitized = text.replace(/\\/g, "\\\\").replace(/`/g, "\\`");

  const prompt = `You are a mood classifier. Analyze the journal entry below and respond with exactly one word from this list: Happy, Sad, Stressed, Angry, Neutral. No punctuation, no explanation, just the one word.

Journal entry:
<entry>
${sanitized}
</entry>

Mood:`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const moodText = response.text().trim().toLowerCase().split(/\s+/)[0];

  return moodMap[moodText] || "🙂";
}

module.exports = classifyMood;
