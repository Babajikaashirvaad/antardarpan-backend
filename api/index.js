const express = require('express');
const router = express.Router();

// Welcome Route
router.get('/welcome', (req, res) => {
  res.send('Welcome to Antardarpan API');
});

// Other future routes can be added here.

module.exports = router;
