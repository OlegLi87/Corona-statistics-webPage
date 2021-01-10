const mongoose = require('mongoose');
const utilFuncs = require('./utilFunctions');
const dailyStatisticsModel = require('../models/dailyStatistics');

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

const fetchFieldSum = async (req, res) => {
  try {
    const fieldName = req.query.field ?? 'wakamakafooooo'; // dummy optional string for avoid sending $ sign alone
    let limit = req.query.limit ?? Infinity;
    limit = Math.floor(limit);
    if (isNaN(limit) || limit < 1) throw new Error('limit must be a positive number');

    const data = await dailyStatisticsModel.aggregate([
      {
        $sort: {
          date: -1,
        },
      },
      {
        $limit: limit,
      },
      {
        $group: {
          _id: null,
          overallSum: {
            $sum: '$' + fieldName,
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    utilFuncs.sendJsonResponse(res, data[0]);
  } catch (error) {
    utilFuncs.errorHandler(res, error);
  }
};

module.exports = { fetchDailyStatistics, fetchDailyStatisticsByID, fetchFieldSum };
