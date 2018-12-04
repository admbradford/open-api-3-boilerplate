const fs = require('fs');
const path = require('path');
const logger = require('consola');
const {
  spawn,
} = require('child_process');
const {
  compileSpec,
} = require('./index');

const SOURCE_DIRECTORY = path.join(process.cwd(), 'src');

const restart = () => {
  const c = spawn('docker', ['restart', 'api_spec'], {
    env: process.env,
    stdio: ['pipe', 'pipe', process.stderr],
  });

  c.stdout.on('data', (data) => {
    logger.log(data.toString());
  });

  c.on('message', msg => logger.log(msg));

  c.on('error', err => logger.error(err));

  c.on('exit', (code, signal) => logger.log('exit', code, signal));

  return c;
};

fs.watch(SOURCE_DIRECTORY, {
  recursive: true,
}, (eventType, filename) => {
  logger.info(`${eventType}: ${filename} - recompile spec`);
  compileSpec()
    .then(() => {
      logger.success('Finished recompile spec');
      logger.log('Restarting Docker');
      return restart();
    });
});

logger.info('Dev server started at http://localhost:8042/');
