const fs = require('fs');
const path = require('path');
const logger = require('consola');
const { compileSpec } = require('./index');

const SOURCE_DIRECTORY = path.join(process.cwd(), 'src');

fs.watch(
  SOURCE_DIRECTORY,
  {
    recursive: true,
  },
  (eventType, filename) => {
    logger.info(`${eventType}: ${filename} - recompile spec`);
    return compileSpec();
  },
);
