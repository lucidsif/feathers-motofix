'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('MechanicSchedules service', function() {
  it('registered the MechanicSchedules service', () => {
    assert.ok(app.service('MechanicSchedules'));
  });
});
