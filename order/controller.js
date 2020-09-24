'use strict';

const express = require('express');
const { Router } = require('express');
const e = require('express');


module.exports = (orderService) => {
    const router = express.Router();

    router.get('/:userID/find-order-by-user-id', async ({params:{userID}}, response, next) => {
        try {
          const order = await orderService.findCartByUserID(userID);
    
          if (!order) { 
            return response.send([]);
          } else {
            return response.send(order);
          }
        } catch (err) {
          return next(err);
        }
      });

      //create a order for the user 
      //name, address, zipCode, country, email, product, paymentType, userID, price
      router.post('/create-order', async ({body: {name, address, postalCode, country, email, paymentType, cart, userID, price, shippingMethod}}, response, next) => {
        try {
           await orderService.createOrder(name, address, postalCode, country, email, paymentType, cart, userID, price, shippingMethod)
           return response.sendStatus(201)
        } catch (err) {
          return next(err);
        }
      });
      
      return router;

};