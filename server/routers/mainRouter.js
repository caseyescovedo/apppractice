const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../views/index.html'));
});

module.exports = router;
