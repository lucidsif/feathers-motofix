'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

//  any-user can see all appointments
// any-user can only see appointments that are pending and are "near" him
// only authenticated users can create an appointment
exports.before = {
  all: [
    auth.populateUser(),
  ],
  find: [],
  get: [],
  create: [
    auth.verifyToken(),
    auth.restrictToAuthenticated()
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
