const express = require('express');
const router = express.Router();
const dailyStatCntrl = require('../controllers/dailyStatistics');

router.get('/dailyStatistics', dailyStatCntrl.fetchDailyStatistics);
router.get('/dailyStatistics/fieldSum', dailyStatCntrl.fetchFieldSum);
router.get('/dailyStatistics/:id', dailyStatCntrl.fetchDailyStatisticsByID);

module.exports = router;
