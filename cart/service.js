'use strict'

const repository = require("./repository");

module.exports = (repository) => {
    const service = {
        findAllProduct() {
            return repository.findAllProduct();
        }
    }
    return service
};