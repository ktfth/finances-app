'use strict';

const args = process.argv.slice(2);

const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');

const socket = io('http://localhost:3030');
const client = feathers();

client.configure(socketio(socket));

const incomeService = client.service('v1/incomes');
const outcomeService = client.service('v1/outcomes');

if (args.length === 2 && args[0] === '--income') {
  incomeService.create({
    value: parseFloat(args[1], 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  }).then(res => {
    console.log('Income created: ', res);
    process.exit(0);
  }).catch(err => {
    console.debug(err);
    process.exit(1);
  });
} else if (args.length === 1 && args[0] === '--incomes-total') {
  incomeService.find({ query: {} }).then(res => {
    let out = 0;
    res.data.forEach(income => {
      out += income.value;
    });
    console.log('Incomes total: ', out);
    process.exit(0);
  });
} else if (args.length === 2 && args[0] === '--outcome') {
  outcomeService.create({
    value: parseFloat(args[1], 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  }).then(res => {
    console.log('Outcome created: ', res);
    process.exit(0);
  }).catch(err => {
    console.debug(err);
    process.exit(1);
  });
} else if (args.length === 1 && args[0] === '--outcomes-total') {
  incomeService.find({ query: {} }).then(res => {
    let out = 0;
    res.data.forEach(outcome => {
      out += outcome.value;
    });
    console.log('Outcomes total: ', out);
    process.exit(0);
  });
} else if (args.length === 1 && args[0] === '--convergence') {
  async function convergence() {
    try {
      const incomes = await incomeService.find({ query: {} });
      const outcomes = await outcomeService.find({ query: {} });
      let incomesTotal = 0;
      let outcomesTotal = 0;
      incomes.data.forEach(income => {
        incomesTotal += income.value;
      });
      outcomes.data.forEach(outcome => {
        outcomesTotal += outcome.value;
      });
      console.log('Convergence: ', incomesTotal - outcomesTotal);
      process.exit(0);
    } catch (e) {
      console.debug(e);
      process.exit(1);
    }
  }

  convergence();
} else {
  console.log('Usage of finances app: ');
  console.log('  --income [Number]');
  console.log('  --outcome [Number]');
  console.log('  --incomes-total');
  console.log('  --outcomes-total');
  console.log('  --convergence');
  process.exit(0);
}
