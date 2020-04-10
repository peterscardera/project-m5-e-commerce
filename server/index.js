'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const items = require('./data/items');
const users = require('./data/users');
const orders = require('./data/orders');
const vendors = require('./data/companies');

const PORT = 4000;

  const handleGetStore = (req, res) => {
    res.status(200).json(items)
  }
  const handleGetVendors = (req, res) => {
    res.status(200).json(vendors)
  }

  const handleGetUser = (req, res) => {
    let userName = req.params.userName;
    const userInfo = users.find(element => element.userName === userName);
    if (!userInfo) {
      res.status(400).json(`User name ${userName} does not exist.`)
    }
    else {
      res.status(200).json(userInfo)
    }
  }

  const handleGetOrders = (req, res) => {
    let userName = req.params.userName;
    let userInfo = users.find(element => element.userName === userName);
    if (!userInfo || !userInfo.id) {
      res.status(400).json(`Error accessing ${userName}'s information.`)
    }
    // console.log(userInfo.id);
    // console.log(orders);
    const userOrders = orders[userInfo.id];
    if (!userOrders) {
      res.status(400).json(`User name ${userName} does not have existing orders...`)
    }
    else {
      res.status(200).json(userOrders)
    }
  }

  const handleMergeCartGetOrders = (req, res) => {
    let incomingCart = req.body.currentCart;
    let userName = req.params.userName;
    let userInfo = users.find(element => element.userName === userName);
    let incomingKeys = Object.keys(incomingCart);
    if (!userInfo || !userInfo.id) {
      res.status(400).json(`Error accessing ${userName}'s information.`)
    }
    const userOrders = orders[userInfo.id];
    if (!userOrders) {
      res.status(400).json(`User name ${userName} does not have existing orders...`)
    }
    else if (incomingKeys.length === 0){
      res.status(200).json(userOrders)
    }
    // case below: user has added items to cart before logging in but their account's cart is empty
    else if (incomingKeys.length > 0 && Object.keys(userOrders.currentCart).length === 0) {
      userOrders.currentCart = incomingCart;
      res.status(200).json(userOrders)
    }
    // case below: user added items to cart before logging in and they already have unpurchased items in their account from another time
    else if (incomingKeys.length > 0 && Object.keys(userOrders.currentCart).length > 0) {
      let userCurrentCartKeys = Object.keys(userOrders.currentCart);
      let itemsWithReducedQuantities = [];
      incomingKeys.forEach((incId)=>{
        let foundKeyInUserOrder = userCurrentCartKeys.find(previousId => previousId === incId)
        if (!foundKeyInUserOrder) {
          userOrders.currentCart[incId] = incomingCart[incId];
        }
        // the item has been ordered before
        else {
          // test available quantity, first case: store has enough, second: store does not have sufficient inventory
          let itemInfo = items.find(element => element.id === parseInt(incId));
          if (itemInfo.numInStock >= parseInt(incomingCart[incId].quantity) + parseInt(userOrders.currentCart[incId].quantity) ){
            userOrders.currentCart[incId].quantity = (parseInt(incomingCart[incId].quantity) + parseInt(userOrders.currentCart[incId].quantity)).toString();
          }
          else {
            userOrders.currentCart[incId].quantity = (itemInfo.numInStock).toString();
            itemsWithReducedQuantities.push(incId);
          }
        }
      })
      res.status(200).json({userOrders: userOrders , itemsWithReducedQuantities: itemsWithReducedQuantities});
    }
    // catch all error... should not occur
    else {
      res.status(400).json(`Unknown error.`)
    }

  }

  const handleAddItem = (req, res) => {
    let userId = req.params.userId;
    let itemId = req.params.itemId;
    let quantity = req.params.quantity;
    let itemInfo = items.find(element => element.id === parseInt(itemId));
    if (!itemInfo) {
      res.status(400).json(`Item number ${itemId} not found.}`)
    }
    else if (!orders[userId]) {
      res.status(400).json(`User ${userId} does not have any orders...`)
    }
    else if (orders[userId].currentCart) {
      if (orders[userId].currentCart[itemId]){
        if ((parseInt(quantity) + parseInt(orders[userId].currentCart[itemId].quantity))  > itemInfo.numInStock) {
          res.status(409).json(`Insufficient quantity of item id ${itemId} in stock.`)
        }
        else {
          orders[userId].currentCart[itemId] = {
            itemInfo: {itemInfo},
            quantity: (parseInt(quantity) + parseInt(orders[userId].currentCart[itemId].quantity)).toString(),
          };
          res.status(200).json(orders[userId].currentCart[itemId])
        }
        // Line below was for when this handle function only introduced new items to cart
        // res.status(400).json(`Item id ${itemId} already exists in user ${userId}'s cart.`)
      }
      else if (parseInt(quantity) > itemInfo.numInStock){
        res.status(409).json(`Insufficient quantity of item id ${itemId} in stock.`)
      }
      else{
        orders[userId].currentCart[itemId] = {
          itemInfo: {itemInfo},
          quantity: quantity,
        };
        res.status(200).json(orders[userId].currentCart[itemId])
      }
    }
    else {
      res.status(400).json(`Unknown error.`)
    }
  }

  const handleRemoveItem = (req, res) => {
    let userId = req.params.userId;
    let itemId = req.params.itemId;
    let quantity = req.params.quantity;
    let itemInfo = items.find(element => element.id === parseInt(itemId));
    if (!itemInfo) {
      res.status(400).json(`Item number ${itemId} not found.}`)
    }
    else if (!orders[userId]) {
      res.status(400).json(`User ${userId} does not have any orders...`)
    }
    else if (orders[userId].currentCart) {
      if (parseInt(orders[userId].currentCart[itemId].quantity) < parseInt(quantity)){
        res.status(400).json(`Error: requested to remove ${quantity} of item id ${itemId} when there are only ${orders[userId].currentCart[itemId].quantity} to be removed.`)
      }
      else if (parseInt(orders[userId].currentCart[itemId].quantity) === parseInt(quantity)){
        delete orders[userId].currentCart[itemId];
        res.status(200).json(orders[userId].currentCart);
      }
      else if (parseInt(orders[userId].currentCart[itemId].quantity) > parseInt(quantity)){
        let currentQuantity = parseInt(orders[userId].currentCart[itemId].quantity);
        let newQuantity = currentQuantity - parseInt(quantity);
        newQuantity = newQuantity.toString();
        orders[userId].currentCart[itemId] = {
          itemInfo: {itemInfo},
          quantity: newQuantity,
        };
        res.status(200).json(orders[userId].currentCart[itemId])
      }
      else {
        res.status(400).json(`Unknown error.`)
      }
    }
    else {
      res.status(400).json(`Unknown error.`)
    }
  }

  const handleEmptyCart = (req, res) => {
    let userId = req.params.userId;
    if (!orders[userId]) {
      res.status(400).json(`User ${userId} does not have any orders...`)
    }
    else {
      orders[userId].currentCart = {};
      res.status(200).json(orders[userId].currentCart)
    }
  }

  const handlePurchase = (req, res) => {
    let userId = req.params.userId;
    if (!orders[userId]) {
      res.status(400).json(`User ${userId} does not have any orders...`)
    }
    else if(Object.keys(orders[userId].currentCart).length === 0) {
      res.status(400).json(`Nothing in the shopping cart to purchase`)
    }
    else if(Object.keys(orders[userId].currentCart).length > 0) {
      let cartKeys = Object.keys(orders[userId].currentCart)
      let notFoundError = false;
      let insufficient = false;
      let insufficientItems = [];
      cartKeys.forEach((id)=>{
        let idInt = parseInt(id);
        let itemInStore = items.find(element => element.id === idInt);
        if (!itemInStore) {notFoundError = true;}
        if(parseInt(order[userId].currentCart[id].quantity) > itemInStore.numInStock) {
          insufficient = true;
          insufficientItems.push(id);
        }
      })
      if (notFoundError) {
        res.status(400).json(`An item inside the cart was not found in the store`)
      }
      else if (insufficient) {
        res.status(400).json(insufficientItems);
      }
      else {
        cartKeys.forEach((id)=>{
          let idInt = parseInt(id);
          let itemInStore = items.find(element => element.id === idInt);
          itemInStore.quantity -= parseInt(order[userId].currentCart[id].quantity);
        })
        let date = Date();
        let randNum = Math.floor(Math.random()*100000);
        let orderId = `${date} - ${randNum}`;
        order[userId].orderHistory.push({ orderId : order[userId].currentCart});
        order[userId].currentCart = {};
        res.status(200).json(orderId);
      }
    }
    else {
      res.status(400).json(`Unknown error.`)
    }
  }

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  .get('/getStore', handleGetStore) // retrieves items that vendor has for sale (regardless of quantity in stock)
  .get('/getVendors', handleGetVendors) // retrieves information about the vendors
  .get('/logIn/:userName', handleGetUser) // retrieves user's profile info
  .get('/:userName/getOrders', handleGetOrders) // retrieves user's order info

  .post('/:userName/mergeCartGetOrders', handleMergeCartGetOrders ) // merges current cart into signed in one's

  .post('/addItem/:userId/:itemId/:quantity', handleAddItem) // adds an item to cart or increases its quantity
  .put('/removeItem/:userId/:itemId/:quantity', handleRemoveItem) // removes all or all cases of an item from a cart
  .put('/emptyCart/:userId', handleEmptyCart) // removes all items from cart
  .get('/purchase/:userId', handlePurchase)
  // The endpoint above: tests stock, if sufficient it reduces the stock.  Generates a semi-random orderNumber.
  // moves the currentCart into the orderHistory in an object as the value of the key: orderNumber.

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
