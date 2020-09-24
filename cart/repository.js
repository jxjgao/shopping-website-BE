'use strict';


const ObjectId = require('mongodb').ObjectID;


module.exports = (db) => {
    const cartCollection = db.collection('cart')
    const productCollection = db.collection('product')

    const repository = {
        findCartByUserID(userID, projection) {
            return cartCollection.findOne(
                {
                    userID: ObjectId(userID),
                    deletedAt:{
                        $exists: false
                    }
                }, projection)
        },

        findProductByID(productID, projection) {
            return productCollection.findOne({
                _id: ObjectId(productID),
                deletedAt: {
                    $exists: false
                }
            }, projection)
        },

        createCart(productInCart,userID) {
            return cartCollection.insertOne(
                {
                    userID: ObjectId(userID),
                    products: productInCart,
                    createdAt: new Date()
                }
            )
        },

        addToCart(productInCart, userID) {
            return cartCollection.update(
                { userID: ObjectId(userID) },
                { $push: { products: productInCart }},
                { deletedAt: {
                    $exists: false
                }}
                
            )
        },

        removeFromCart(productArray, userID) {
            return cartCollection.update(
                { userID: ObjectId(userID) },
                {$set: {products: productArray}},
                { deletedAt: {
                    $exists: false
                }}
            )
        },

        clearCartByUserID(userID) {
            return cartCollection.update(
                { userID: ObjectId(userID) },
                { $unset: {
                    products: []
                }}
            );
        }


    }
    return repository
};