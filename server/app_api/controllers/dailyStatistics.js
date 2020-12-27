const mongoose = require('mongoose');
const utilFuncs = require('./utilFunctions');
const dailyStatisticsModel = require('../models/dailyStatistics');

// can fetch all documents or a specific one based on provided query params
const fetchDailyStatistics = async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const projectionObject = utilFuncs.createPojectionObject(req.query);
    const data = await dailyStatisticsModel.find({}).select(projectionObject).limit(limit).sort({ date: -1 });
    utilFuncs.sendJsonResponse(res, data);
  } catch (error) {
    utilFuncs.errorHandler(res, error);
  }
};

const fetchDailyStatisticsByID = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const data = await dailyStatisticsModel.findById(id);
    if (!data) return utilFuncs.sendJsonResponse(res, data, 404);
    utilFuncs.sendJsonResponse(res, data);
  } catch (error) {
    utilFuncs.errorHandler(res, error);
  }
};

module.exports = { fetchDailyStatistics, fetchDailyStatisticsByID };
