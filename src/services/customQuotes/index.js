'use strict';

const service = require('feathers-sequelize');
const customQuotes = require('./customQuotes-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: customQuotes(app.get('sequelize')),
  };

  // Initialize our service with any options it requires
  app.use('/customQuotes', service(options));

  // Get our initialize service to that we can bind hooks
  const customQuotesService = app.service('/customQuotes');

  // Set up our before hooks
  customQuotesService.before(hooks.before);

  // Set up our after hooks
  customQuotesService.after(hooks.after);
};
