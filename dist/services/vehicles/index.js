'use strict';
const service = require('feathers-sequelize');
const vehicles = require('./vehicles-model');
const hooks = require('./hooks');
module.exports = function () {
    const app = this;
    const options = {
        Model: vehicles(app.get('sequelize')),
    };
    app.use('/vehicles', service(options));
    const vehiclesService = app.service('/vehicles');
    vehiclesService.before(hooks.before);
    vehiclesService.after(hooks.after);
};
//# sourceMappingURL=index.js.map