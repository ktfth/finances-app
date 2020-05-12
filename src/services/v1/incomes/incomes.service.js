// Initializes the `v1/incomes` service on path `/v1/incomes`
const { Incomes } = require('./incomes.class');
const createModel = require('../../../models/incomes.model');
const hooks = require('./incomes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/incomes', new Incomes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/incomes');

  service.hooks(hooks);
};
