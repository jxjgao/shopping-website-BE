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

        addToCart(productID, userID) {
            return cartCollection.findOneAndUpdate(
                { userID: ObjectId(userID) },
                { $push: { products: productID }},
                {returnOriginal: false},
                { deletedAt: {
                    $exists: false
                }} 
            )
        },

        removeFromCart(productArray, userID) {
            return cartCollection.findOneAndUpdate(
                { userID: ObjectId(userID) },
                {$set: {products: productArray}},
                {returnOriginal: false},
                { deletedAt: {
                    $exists: false
                }}
            )
        },

        clearCartByUserID(userID) {
            return cartCollection.findOneAndUpdate(
                { userID: ObjectId(userID) },
                { $set: {
                    products: []
                }}
            );
        }
    }
    return repository
};