'use strict';

const service = require('feathers-sequelize');
const mechanicSchedules = require('./mechanicSchedules-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: mechanicSchedules(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/mechanicSchedules', service(options));

  // Get our initialize service to that we can bind hooks
  const mechanicSchedulesService = app.service('/mechanicSchedules');

  // Set up our before hooks
  mechanicSchedulesService.before(hooks.before);

  // Set up our after hooks
  mechanicSchedulesService.after(hooks.after);
};
