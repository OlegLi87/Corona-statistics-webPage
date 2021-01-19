const mongoose = require('mongoose');

cityBasedStatisticsSchema = new mongoose.Schema({
  date: Date,
  city: String,
  grade: Number,
  sickNew: Number,
  positiveTests: Number,
  identifiedChangeRate: Number,
  sickActive: Number,
});

const CityBasedStatisticsModel = mongoose.model('CityBasedStatistics', cityBasedStatisticsSchema, 'cityBasedStatistics');
module.exports = CityBasedStatisticsModel;
