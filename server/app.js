const chalk = require('chalk');
const express = require('express');
const app = express();
const cors = require('cors');

const dailyStatisticsRouter = require('./app_api/routes/dailyStatistics');
const resourceNotFoundRouter = require('./app_api/routes/resourceNotFound');

// connecting to a database
require('./app_api/db/db');

const PORT = parseInt(process.env.PORT, 10);

// enabling cross origin resource sharing
app.use(cors());

app.use('', dailyStatisticsRouter);
app.use('', resourceNotFoundRouter);

app.listen(PORT, () => {
  console.log(chalk.yellow(`Listening on port ${PORT}...`));
});
