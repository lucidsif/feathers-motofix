'use strict';

const service = require('feathers-sequelize');
const vehicles = require('./vehicles-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: vehicles(app.get('sequelize')),
  };

  // Initialize our service with any options it requires
  app.use('/vehicles', service(options));

  // Get our initialize service to that we can bind hooks
  const vehiclesService = app.service('/vehicles');

  // Set up our before hooks
  vehiclesService.before(hooks.before);

  // Set up our after hooks
  vehiclesService.after(hooks.after);
};
