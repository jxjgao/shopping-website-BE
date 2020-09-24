'use strict';
const Repository = require('./repository');
const orderService = require('./service');
const Controller = require('./controller');

module.exports = (db) => {
  return Controller(orderService(Repository(db)));
};
