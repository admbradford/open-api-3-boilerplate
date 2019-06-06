const express = require('express');
const browserSync = require('browser-sync');
const swaggerUi = require('swagger-ui-express');
const nodemon = require('nodemon');
const app = express();

const port = 8442;
const proxyPort = port + 1;

const swaggerUIOptions = {
  swaggerOptions: {
    url: `http://localhost:${proxyPort}/swagger.json`,
  },
};

app.use('/swagger.json', express.static(__dirname + '/swagger.json'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerUIOptions));

nodemon('--watch src util/build.js');

function listening() {
  browserSync({
    files: ['swagger.json'],
    online: false,
    open: false,
    port: proxyPort,
    proxy: `localhost:${port}/api-docs/`,
    ui: false,
  });
}

app.listen(port, listening);
