'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('quotes service', function() {
  it('registered the quotes service', () => {
    assert.ok(app.service('quotes'));
  });
});
