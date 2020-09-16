'use strict';

module.exports = (db) => {
    const productCollection = db.collection('products')
    const repository = {
        findProductById(productID, projection) {
            return productCollection.findOne(
                {
                    _id: id(productID),
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