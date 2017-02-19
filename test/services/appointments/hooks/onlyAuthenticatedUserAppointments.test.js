'use strict';

const assert = require('assert');
const onlyAuthenticatedUserAppointments = require('../../../../src/services/appointments/hooks/onlyAuthenticatedUserAppointments.js');

describe('appointments onlyAuthenticatedUserAppointments hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    onlyAuthenticatedUserAppointments()(mockHook);

    assert.ok(mockHook.onlyAuthenticatedUserAppointments);
  });
});
