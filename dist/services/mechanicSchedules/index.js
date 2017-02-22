'use strict';
const service = require('feathers-sequelize');
const mechanicSchedules = require('./mechanicSchedules-model');
const hooks = require('./hooks');
module.exports = function () {
    const app = this;
    const options = {
        Model: mechanicSchedules(app.get('sequelize')),
    };
    app.use('/mechanicSchedules', service(options));
    const mechanicSchedulesService = app.service('/mechanicSchedules');
    mechanicSchedulesService.before(hooks.before);
    mechanicSchedulesService.after(hooks.after);
};
//# sourceMappingURL=index.js.map