'use strict';
const leads = require('./leads');
const customQuotes = require('./customQuotes');
const mechanicSchedules = require('./mechanicSchedules');
const appointments = require('./appointments');
const mechanics = require('./mechanics');
const quotes = require('./quotes');
const graphql = require('./graphql');
const authentication = require('./authentication');
const users = require('./users');
const motorcycles = require('./motorcycles');
const Sequelize = require('sequelize');
module.exports = function () {
    const app = this;
    const sequelize = new Sequelize(app.get('postgres'), {
        dialect: 'postgres',
        logging: true
    });
    app.set('sequelize', sequelize);
    app.configure(authentication);
    app.configure(users);
    app.configure(graphql);
    app.configure(quotes);
    app.configure(mechanics);
    app.configure(appointments);
    app.configure(mechanicSchedules);
    app.configure(customQuotes);
    app.configure(leads);
    app.configure(motorcycles);
    const models = sequelize.models;
    Object.keys(models)
        .map(name => models[name])
        .filter(model => model.associate)
        .forEach(model => model.associate(models));
    sequelize.sync();
};
//# sourceMappingURL=index.js.map