
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { getGeminiResponse } = require('../utils/gemini');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/review', upload.single('resume'), async (req, res) => {
  try {
    const pdfBuffer = req.file.buffer;
    const parsed = await pdfParse(pdfBuffer);

    const resumeText = parsed.text;
    const aiResponse = await getGeminiResponse(resumeText);

    res.json({ success: true, feedback: aiResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to process resume' });
  }
});

module.exports = router;
