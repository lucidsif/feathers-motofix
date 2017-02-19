'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

//  any-user can see all appointments
// any-user can only see appointments that are pending
// only authenticated users can create an appointment
// authenticated users should be able to see his own appointments

// TODO: get all appointments associated with the jwt token provided
exports.before = {
  all: [],
  find: [
    auth.verifyToken(),
    //auth.populateUser(),
  ],
  get: [
    auth.verifyToken(),
    //auth.populateUser(),
  ],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
  ],
  update: [hooks.disable()],
  patch: [hooks.disable()],
  remove: [hooks.disable()]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
