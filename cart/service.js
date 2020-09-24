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
            let cartOrganized = []
            let totalPrice = 0
            let item = {}

            const cart = await repository.findCartByUserID(userID, {products: true});
            const productArray = cart.products
            const countArray = _.map(_.countBy(productArray, "_id"), (val, key) => ({productID: key, count: val }));

            if (cart.products.length !== 0) {
                for (let i = 0; i < countArray.length; i++) {
                    item = await repository.findProductByID(countArray[i].productID)
                    totalPrice += item.price * countArray[i].count
                    item.count = countArray[i].count
                    cartOrganized.push(item);
                }
            }

        return [cartOrganized, totalPrice]
    },

        async createCart(productID, userID) {
            const findProduct = await repository.findProductByID(productID)
            const productArray = []
            productArray.push(findProduct)
            return repository.createCart(productArray, userID);
        },

        async addToCart(productID, userID) {
            const product = await repository.findProductByID(productID)
            console.log(product)
            return repository.addToCart(product, userID)
        },

        async removeFromCart(productID, userID) {
            const cart = await cartService.findCartByUserID(userID)
            const productArray = cart.products
 
            for (let i = 0; i < productArray.length; i++) {

                if (ObjectId(productArray[i]._id).toString() === productID) {
                    console.log('if')
                    productArray.splice(i, 1)
                    break;
                }
            }

            return await repository.removeFromCart(productArray, userID)
        },

        clearCartByUserID(userID) {
            return repository.clearCartByUserID(userID)
        }


    }
    return cartService
};