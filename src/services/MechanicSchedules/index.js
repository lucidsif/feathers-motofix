'use strict';

const service = require('feathers-sequelize');
const MechanicSchedules = require('./MechanicSchedules-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: MechanicSchedules(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/MechanicSchedules', service(options));

  // Get our initialize service to that we can bind hooks
  const MechanicSchedulesService = app.service('/MechanicSchedules');

  // Set up our before hooks
  MechanicSchedulesService.before(hooks.before);

  // Set up our after hooks
  MechanicSchedulesService.after(hooks.after);
};
