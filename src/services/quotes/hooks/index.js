'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const process = require('./process');


exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
  ],
  find: [
    auth.queryWithCurrentUser({ idField: 'id', as: 'fk_user_id' })
  ],
  get: [
  ],
  // use associatecurrent user instead?
  create: [
    process()
  ],
  update: [
    process()
  ],
  patch: [],
  remove: []
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
