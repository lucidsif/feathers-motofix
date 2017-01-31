'use strict';
const quotes = require('./quotes');
const viewer = require('./viewer');
const graphql = require('./graphql');
const vehicles = require('./vehicles');
const authentication = require('./authentication');
const users = require('./users');
const Sequelize = require('sequelize');
module.exports = function() {
  const app = this;

  const sequelize = new Sequelize(app.get('postgres'), {
    dialect: 'postgres',
    logging: true
  });
  app.set('sequelize', sequelize);

  app.configure(authentication);
  app.configure(users);
  app.configure(vehicles);
  app.configure(graphql);
  app.configure(viewer);
  app.configure(quotes);
};
