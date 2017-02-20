'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

// user can get all appointments, get only his own appointments, and can only create an appointment for himself if he provides his jwt

// TODO: create a custom hook for appointments where if a token is provided, only the associated users'a appts are returned. else, return all appts.
exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.associateCurrentUser({ idField: 'id', as: 'fk_user_id' })
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
