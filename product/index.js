'use strict';
const Repository = require('./repository');
const productService = require('./service');
const Controller = require('./controller');

module.exports = (db) => {
  return Controller(productService(Repository(db)));
};
