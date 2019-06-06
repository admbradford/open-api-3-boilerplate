const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const JsonRefs = require('json-refs');

const build = async () => {
  JsonRefs.clearCache();
  return JsonRefs.resolveRefsAt(path.join(__dirname, '../src/index.json'), {
    location: path.join(process.cwd(), 'src/index.json'),
  }).then(results => {
    const env = {
      development: {
        host: 'localhost:9000',
        schemes: ['http'],
      },
      production: {
        host: '',
        schemes: ['https'],
      },
    };
    const compiled = Object.assign(
      {},
      results.resolved,
      env[process.env.NODE_ENV],
    );
    return JSON.stringify(compiled, null, 2);
  });
};

const compileSpec = async () => {
  const write = promisify(fs.writeFile);
  const contents = await build();
  await write(path.resolve(__dirname, '../swagger.json'), contents);
};

module.exports = {
  compileSpec,
};
