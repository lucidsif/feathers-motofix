'use strict';

const service = require('feathers-sequelize');
const leads = require('./leads-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: leads(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/leads', service(options));

  // Get our initialize service to that we can bind hooks
  const leadsService = app.service('/leads');

  // Set up our before hooks
  leadsService.before(hooks.before);

  // Set up our after hooks
  leadsService.after(hooks.after);
};
