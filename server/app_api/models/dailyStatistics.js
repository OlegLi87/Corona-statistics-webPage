const mongoose = require('mongoose');

const dailyStatisticsSchema = new mongoose.Schema({
  date: Date,
  identified: Number,
  identifiedFromMidnight: Number,
  identifiedOverall: Number,
  respiratory: Number,
  respiratoryFromMidnight: Number,
  recovered: Number,
  sickActive: Number,
  sickActiveFromMidnight: Number,
  sickActiveAtHome: Number,
  sickActiveAtHospital: Number,
  sickActiveAtHotel: Number,
  sickSerious: Number,
  sickSeriousFromMidnight: Number,
  sickModerate: Number,
  sickCritical: Number,
  deaths: Number,
  deathsOverall: Number,
  tests: Number,
});

const dailyStatisticsModel = mongoose.model('DailyStatistic', dailyStatisticsSchema, 'dailyStatistics');
module.exports = dailyStatisticsModel;
