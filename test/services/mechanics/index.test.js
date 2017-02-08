'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('mechanics service', function() {
  it('registered the mechanics service', () => {
    assert.ok(app.service('mechanics'));
  });
});
