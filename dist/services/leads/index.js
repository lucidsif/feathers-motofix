'use strict';
const service = require('feathers-sequelize');
const leads = require('./leads-model');
const hooks = require('./hooks');
module.exports = function () {
    const app = this;
    const options = {
        Model: leads(app.get('sequelize')),
    };
    app.use('/leads', service(options));
    const leadsService = app.service('/leads');
    leadsService.before(hooks.before);
    leadsService.after(hooks.after);
};
//# sourceMappingURL=index.js.map