const assert = require('assert');
const app = require('../../../src/app');

describe('\'v1/outcomes\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/outcomes');

    assert.ok(service, 'Registered the service');
  });
});
