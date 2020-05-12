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
  }).then(res => {
    console.log('Income created: ', res);
    process.exit(0);
  }).catch(err => {
    console.debug(err);
    process.exit(1);
  });
} else if (args.length === 2 && args[0] === '--outcome') {
  outcomeService.create({
    value: parseFloat(args[1], 10),
  }).then(res => {
    console.log('Outcome created: ', res);
    process.exit(0);
  }).catch(err => {
    console.debug(err);
    process.exit(1);
  });
}
