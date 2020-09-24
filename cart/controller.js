'use strict';

const express = require('express');
const { Router } = require('express');
const e = require('express');


module.exports = (cartService) => {
    const router = express.Router();

    router.get('/:userID/find-cart-by-id', async ({params:{userID}}, response, next) => {
        try {
          const cart = await cartService.findCartByUserID(userID);
    
          if (!cart) { 
            return response.send([]);
          } else {
            return response.send(cart);
          }
        } catch (err) {
          return next(err);
        }
      });

      router.get('/:userID/group-product', async ({params:{userID}}, response, next) => {
        try {
          const cart = await cartService.groupSameProductInCartAndCalculateTotalPrice(userID);
    
          if (!cart) { 
            return response.send([]);
          } else {
            return response.send(cart);
          }
        } catch (err) {
          return next(err);
        }
      });

      //create a cart for the user if a cart for them doesn't exist
      router.post('/create-cart', async ({body: {productID, userID}}, response, next) => {
        try {
           await cartService.createCart(productID, userID)
           return response.sendStatus(201)
        } catch (err) {
          return next(err);
        }
      });

      //updates cart
      router.put('/add-to-cart', async({body: {productID, userID}}, response, next) => {
        try {
          await cartService.addToCart(productID, userID)
          return response.sendStatus(201)
        } catch(err) {
          return next(err)
        }
      });

      router.put('/remove-from-cart', async({body: {productID, userID}}, response, next) => {
        try {
          await cartService.removeFromCart(productID, userID)
          return response.sendStatus(201)
        } catch(err) {
          return next(err)
        }
      });

      router.put('/:userID/clear-cart-by-user-id', async ({params: {userID}}, response, next) => {
        try {
          await cartService.clearCartByUserID(userID);
          return response.sendStatus(200);
        } catch(err) {
          return next(err)
        }
      });
      
      return router;

};