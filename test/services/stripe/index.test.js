'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('stripe service', function() {
  it('registered the stripes service', () => {
    assert.ok(app.service('stripes'));
  });
});
