'use strict'

const repository = require("./repository");
const ObjectId = require('mongodb').ObjectID;
const _ = require('lodash');


module.exports = (repository) => {
    const cartService = {
        findCartByUserID(userID) {
            return repository.findCartByUserID(userID)
        },

        async groupSameProductInCartAndCalculateTotalPrice(userID) {
            let organizedCart = []
            let totalPrice = 0
            let item = {}

            const cart = await repository.findCartByUserID(userID, {products: true});
            const productArray = cart.products
            const countArray = _.map(_.countBy(productArray), (val, key) => ({productID: key, count: val }));

            if (cart.products.length !== 0) {
                for (let i = 0; i < countArray.length; i++) {
                    item = await repository.findProductByID(countArray[i].productID)
                    totalPrice += item.price * countArray[i].count
                    item.count = countArray[i].count
                    organizedCart.push(item);
                }
            }
            
            return [organizedCart, totalPrice]
    },

        async createCart(productID, userID) {
            const productArray = []
            productArray.push(productID)
            return repository.createCart(productArray, userID);
        },

        async addToCart(productID, userID) {
            return await repository.addToCart(productID, userID)
        },

        async removeFromCart(productID, userID) {
            let found = 0
            const cart = await cartService.findCartByUserID(userID)
            const productArray = cart.products
 
            for (let i = 0; i < productArray.length; i++) {

                if (productArray[i] === productID && found === 0) {
                    productArray.splice(i, 1);
                    found = 1;
                }
            }

            return repository.removeFromCart(productArray, userID)
        },

        clearCartByUserID(userID) {
            return repository.clearCartByUserID(userID)
        }


    }
    return cartService
};