'use strict';

const ObjectId = require('mongodb').ObjectID;

module.exports = (db) => {
    const productCollection = db.collection('product')
    const repository = {
        findProductById(productID, projection) {
            return productCollection.findOne(
                {
                    _id: ObjectId(productID),
                    deletedAt:{
                        $exists: false
                    }
                }, projection)
        },

        findAllProduct() {
            return productCollection.find().toArray();
        }


    }
    return repository
};