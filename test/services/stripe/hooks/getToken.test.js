'use strict';

const assert = require('assert');
const getToken = require('../../../../src/services/stripe/hooks/getToken.js');

describe('stripe getToken hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    getToken()(mockHook);

    assert.ok(mockHook.getToken);
  });
});
