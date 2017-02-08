'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('appointments service', function() {
  it('registered the appointments service', () => {
    assert.ok(app.service('appointments'));
  });
});
