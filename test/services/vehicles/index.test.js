'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('vehicles service', function() {
  it('registered the vehicles service', () => {
    assert.ok(app.service('vehicles'));
  });
});
