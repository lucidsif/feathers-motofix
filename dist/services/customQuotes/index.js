'use strict';
const service = require('feathers-sequelize');
const customQuotes = require('./customQuotes-model');
const hooks = require('./hooks');
module.exports = function () {
    const app = this;
    const options = {
        Model: customQuotes(app.get('sequelize')),
    };
    app.use('/customQuotes', service(options));
    const customQuotesService = app.service('/customQuotes');
    customQuotesService.before(hooks.before);
    customQuotesService.after(hooks.after);
};
//# sourceMappingURL=index.js.map