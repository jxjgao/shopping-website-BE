'use strict';

const ObjectId = require('mongodb').ObjectID;


module.exports = (db) => {
    const orderCollection = db.collection('order')
    const cartCollection = db.collection('cart')

    const repository = {
        findOrderByUserID(userID, projection) {
            return orderCollection.findOne(
                {
                    userID: ObjectId(userID),
                    deletedAt:{
                        $exists: false
                    }
                }, projection)
        },

        findCartByUserID(userID, projection) {
            return cartCollection.findOne(
                {
                    userID: ObjectId(userID),
                    deletedAt:{
                        $exists: false
                    }
                }, projection)
        },

        createOrder(name, address, postalCode, country, email, paymentType, cart, userID, price, shippingMethod) {
            return orderCollection.insertOne(
                {
                    userID: ObjectId(userID),
                    name: name,
                    address: address,
                    postalCode: postalCode,
                    country: country,
                    email: email,
                    product: cart,
                    paymentType: paymentType,
                    totalPrice: price,
                    shippingMethod: shippingMethod,
                    createdAt: new Date()
                }
            )
        }


    }
    return repository
};