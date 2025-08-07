const express = require('express');
const router = express.Router();

// GET /api/welcome
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Antardarpan backend! Server is live and working.'
  });
});

module.exports = router;
