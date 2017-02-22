'use strict';
const service = require('feathers-sequelize');
const mechanics = require('./mechanics-model');
const hooks = require('./hooks');
module.exports = function () {
    const app = this;
    const options = {
        Model: mechanics(app.get('sequelize')),
    };
    app.use('/mechanics', service(options));
    const mechanicsService = app.service('/mechanics');
    mechanicsService.before(hooks.before);
    mechanicsService.after(hooks.after);
};
//# sourceMappingURL=index.js.map