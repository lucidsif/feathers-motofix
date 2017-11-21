'use strict';
const service = require('feathers-sequelize');
const leads = require('./motorcycles-model');
const hooks = require('./hooks');
module.exports = function () {
    const app = this;
    const options = {
        Model: leads(app.get('sequelize')),
    };
    app.use('/motorcycles', service(options));
    const motorcyclesService = app.service('/motorcycles');
    motorcyclesService.before(hooks.before);
    motorcyclesService.after(hooks.after);
};
//# sourceMappingURL=index.js.map