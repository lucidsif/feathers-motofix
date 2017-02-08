'use strict';

const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  .use('/', serveStatic( app.get('public') ))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware);

/*
// Setup Forest environment variables and do not version them
const FOREST_ENV_SECRET='16e3f0b35d43e5a021e2c5ecc1ecd3f0ac34b3aa2ee15c75bb125034febd5bd7';
// Choose a random secure auth secret
const FOREST_AUTH_SECRET='BAJSFHASJHFJGAH24423';

// Figure this out and you might get forest admin
app.use(require('forest-express-sequelize').init({
  modelsDir: __dirname + '/models', // Your models directory.
  envSecret: FOREST_ENV_SECRET,
  authSecret: FOREST_AUTH_SECRET,
  sequelize: require('./models').sequelize // The sequelize database connection.
}));
*/
module.exports = app;
