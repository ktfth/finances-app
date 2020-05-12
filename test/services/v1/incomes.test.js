const assert = require('assert');
const app = require('../../../src/app');

describe('\'v1/incomes\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/incomes');

    assert.ok(service, 'Registered the service');
  });
});
