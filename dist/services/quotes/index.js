'use strict';
const service = require('feathers-sequelize');
const quotes = require('./quotes-model');
const hooks = require('./hooks');
module.exports = function () {
    const app = this;
    const options = {
        Model: quotes(app.get('sequelize')),
    };
    app.use('/quotes', service(options));
    const quotesService = app.service('/quotes');
    quotesService.before(hooks.before);
    quotesService.after(hooks.after);
};
//# sourceMappingURL=index.js.map