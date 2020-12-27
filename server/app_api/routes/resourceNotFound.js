const express = require('express');
const router = express.Router();
const resourceNotFound = require('../controllers/resourceNotFound').resourceNotFound;

router.get('*', resourceNotFound);

module.exports = router;
