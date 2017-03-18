'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('customQuotes service', function() {
  it('registered the customQuotes service', () => {
    assert.ok(app.service('customQuotes'));
  });
});
