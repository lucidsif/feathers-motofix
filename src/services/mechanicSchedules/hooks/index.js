'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [
    auth.populateUser(),
  ],
  find: [],
  get: [],
  create: [hooks.disable()],
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
