const express = require('express');
const router = express.Router();
const cityBasedStatCntrl = require('../controllers/cityBasedStatistics');

router.get('/cityBasedStatistics', cityBasedStatCntrl.fetchCityBasedStatistics);
router.get('/cityBasedStatistics/:id', cityBasedStatCntrl.fetchCityBasedStatisticsById);

module.exports = router;
