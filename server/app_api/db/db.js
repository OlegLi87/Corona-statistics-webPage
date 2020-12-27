const mongoose = require('mongoose');
const chalk = require('chalk');
const readLine = require('readline');
const dbConnectionString = process.env.mongoDB_connectionString;

const connectionConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbConnectionString, connectionConfig)
  .then(() => {
    console.log(chalk.yellow('Connection with database successfully established...'));
  })
  .catch((error) => {
    console.log(chalk.red(`Initial connection to database failed...\n ${error}`));
  });

mongoose.connection.on('disconnected', () => {
  console.log(chalk.red('Disconnected from database...'));
});

// function will be triggered in case error occurs after first connection was successful.
mongoose.connection.on('error', (error) => {
  console.log(chalk.red(`Connection to database failed...\n ${error}`));
});

// emulating SIGUSR2 signal for node process which will be emitted on nodemon app restart on windows systems.
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('close', () => {
    process.emit('SIGUSR2');
  });
}

// listeninng for SIGINT and SIGUSR2(for nodemon) system signals and closing connection to database
const gracefullShutdown = (message, callback) => {
  mongoose.connection.close(() => {
    console.log(chalk.red(message));
    callback();
  });
};

process.on('SIGUSR2', () => {
  gracefullShutdown('Database connection closed on app restart...', () => {
    process.kill(process.pid);
  });
});

process.on('SIGINT', () => {
  gracefullShutdown('Database connection closed on app termination...', () => {
    process.exit(0);
  });
});
