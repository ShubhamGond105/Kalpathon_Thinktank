
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getGeminiResponse(resumeText) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are a career coach and resume reviewer.
Please analyze the resume below and provide:
1. A summary review
2. Skills to improve
3. Top 3 career paths
4. Suggestions to enhance the resume

Resume:
${resumeText}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = { getGeminiResponse };
