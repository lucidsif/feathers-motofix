'use strict';

const service = require('feathers-sequelize');
const leads = require('./motorcycles-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: leads(app.get('sequelize')),
  };

  // Initialize our service with any options it requires
  app.use('/motorcycles', service(options));

  // Get our initialize service to that we can bind hooks
  const motorcyclesService = app.service('/motorcycles');

  // Set up our before hooks
  motorcyclesService.before(hooks.before);

  // Set up our after hooks
  motorcyclesService.after(hooks.after);
};
