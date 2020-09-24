'use strict';
const Repository = require('./repository');
const cartService = require('./service');
const Controller = require('./controller');

module.exports = (db) => {
  return Controller(cartService(Repository(db)));
};
