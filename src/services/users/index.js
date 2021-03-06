'use strict';

const service = require('feathers-sequelize');
const users = require('./users-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: users(app.get('sequelize')),
  };

  // Initialize our service with any options it requires
  app.use('/users', service(options));

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/users')

  // Set up our before hooks
  userService.before(hooks.before);

  // Set up our after hooks
  userService.after(hooks.after);
};
