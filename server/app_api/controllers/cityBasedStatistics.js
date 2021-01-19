const mongoose = require('mongoose');
const utilFuncs = require('./utilFunctions');
const CityBasedStatisticsModel = require('../models/cityBasedStatistics');

const fetchCityBasedStatistics = async (req, res) => {
  try {
    const data = await CityBasedStatisticsModel.find({}).select({ date: 0 });
    utilFuncs.sendJsonResponse(res, data);
  } catch (error) {
    utilFuncs.errorHandler(res, error);
  }
};

const fetchCityBasedStatisticsById = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const data = await CityBasedStatisticsModel.findById(id);
    utilFuncs.sendJsonResponse(res, data);
  } catch (error) {
    utilFuncs.errorHandler(res, error);
  }
};

module.exports = { fetchCityBasedStatistics, fetchCityBasedStatisticsById };
