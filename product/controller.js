'use strict';

const express = require('express');
const { Router } = require('express');


module.exports = (productService) => {
    const router = express.Router();

    router.get('/find-all-product', async (params, response, next) => {
        try {
          const product = await productService.findAllProduct();
    
          return response.send(product);
        } catch (err) {
          return next(err);
        }
      });
    
      return router;

};