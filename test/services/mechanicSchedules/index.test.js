'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('mechanicSchedules service', function() {
  it('registered the mechanicSchedules service', () => {
    assert.ok(app.service('mechanicSchedules'));
  });
});
