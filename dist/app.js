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
const Raven = require('raven');
const app = feathers();
app.configure(configuration(path.join(__dirname, '..')));
app.use(Raven.requestHandler())
    .use(Raven.errorHandler())
    .use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(res.sentry + '\n');
})
    .use(compress())
    .use(cors())
    .use(favicon(path.join(app.get('public'), 'favicon.ico')))
    .use('/', serveStatic(app.get('public')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .configure(hooks())
    .configure(rest())
    .configure(socketio())
    .configure(services)
    .configure(middleware);
module.exports = app;
//# sourceMappingURL=app.js.map