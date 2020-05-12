const v1Incomes = require('./v1/incomes/incomes.service.js');
const v1Outcomes = require('./v1/outcomes/outcomes.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(v1Incomes);
  app.configure(v1Outcomes);
};
