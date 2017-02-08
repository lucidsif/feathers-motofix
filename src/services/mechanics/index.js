'use strict';

const service = require('feathers-sequelize');
const mechanics = require('./mechanics-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: mechanics(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/mechanics', service(options));

  // Get our initialize service to that we can bind hooks
  const mechanicsService = app.service('/mechanics');

  // Set up our before hooks
  mechanicsService.before(hooks.before);

  // Set up our after hooks
  mechanicsService.after(hooks.after);
};
