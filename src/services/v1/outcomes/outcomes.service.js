// Initializes the `v1/outcomes` service on path `/v1/outcomes`
const { Outcomes } = require('./outcomes.class');
const createModel = require('../../../models/outcomes.model');
const hooks = require('./outcomes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/outcomes', new Outcomes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/outcomes');

  service.hooks(hooks);
};
