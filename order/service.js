'use strict'

const repository = require("./repository");

module.exports = (repository) => {
    const orderService = {
        findOrderByUserID(userID) {
            return repository.findOrderByUserID(userID)
        },

        async createOrder(name, address, postalCode, country, email, paymentType, cart, userID, price, shippingMethod) {
            return repository.createOrder(name, address, postalCode, country, email, paymentType, cart, userID, price, shippingMethod)
        }
    }
    return orderService
};