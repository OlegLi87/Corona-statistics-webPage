const utilFuncs = require('./utilFunctions');

const resourceNotFound = (req, res) => {
  utilFuncs.sendJsonResponse(res, { message: 'resource not found' }, 404);
};

module.exports = { resourceNotFound };
