'use strict';
const service = require('feathers-sequelize');
const appointments = require('./appointments-model');
const hooks = require('./hooks');
module.exports = function () {
    const app = this;
    const options = {
        Model: appointments(app.get('sequelize')),
    };
    app.use('/appointments', service(options));
    const appointmentsService = app.service('/appointments');
    appointmentsService.before(hooks.before);
    appointmentsService.after(hooks.after);
};
//# sourceMappingURL=index.js.map