'use strict'

const repository = require("./repository");

module.exports = (repository) => {
    const productService = {
        findAllProduct() {
            return repository.findAllProduct();
        },

        findProductByID(productID) {
            return respository.findProductByID(productID);
        }
    }
    return productService
};