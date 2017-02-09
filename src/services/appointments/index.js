'use strict';

const service = require('feathers-sequelize');
const appointments = require('./appointments-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: appointments(app.get('sequelize')),
  };

  // Initialize our service with any options it requires
  app.use('/appointments', service(options));

  // Get our initialize service to that we can bind hooks
  const appointmentsService = app.service('/appointments');

  // Set up our before hooks
  appointmentsService.before(hooks.before);

  // Set up our after hooks
  appointmentsService.after(hooks.after);
};
