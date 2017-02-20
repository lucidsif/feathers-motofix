'use strict';

const getToken = require('./getToken');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    getToken()
  ],
  update: [],
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
