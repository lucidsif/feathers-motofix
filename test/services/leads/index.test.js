'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('leads service', function() {
  it('registered the leads service', () => {
    assert.ok(app.service('leads'));
  });
});
