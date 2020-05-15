"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const items = require("./data/items");
const users = require("./data/users");
const orders = require("./data/orders");
const vendors = require("./data/companies");

const { 
  getUserInfo, 
  getItemInfo,
  getVendorInfo,
  postCreateAccount,
  getOrders,
  getAddItem,
  putRemoveItem,
  postMergeCartGetOrders,
  putEmptyCart,
  postPurchase,
} = require('./handlers');

const PORT = 4000;

const handleGetStore = (req, res) => {
  res.status(200).json(items);
};
const handleGetVendors = (req, res) => {
  res.status(200).json(vendors);
};

const handleLogIn = (req, res) => {
  let email = req.params.email.toLowerCase();
  const userInfo = users.find((element) => element.email === email);
  if (!userInfo) {
    res.status(400).json(`Account linked to: ${email}, does not exist.`);
  }

  let password = req.body.password;

  if (password === userInfo.password) {
    res.status(200).json(userInfo);
  } else {
    res.status(422).json("Password is incorrect.");
  }
};

const handleCreateAccount = (req, res) => {
  let email = req.params.email.toLowerCase();
  let userInfo = users.find((element) => element.email === email);
  if (userInfo) {
    res.status(403).json(`Email address: ${email} already has an account.`);
  }
  let id = users.length + 1;
  if (id < 10) id = `000${id}`;
  else if (id < 100) id = `00${id}`;
  else if (id < 1000) id = `0${id}`;
  else id = `${id}`;
  console.log(req.params);
  let password = req.body.password;
  let userName = req.body.userName;
  let givenName = req.body.givenName;
  let surName = req.body.surName;
  let addressHouseNum = req.body.addressHouseNum;
  let addressStreetName = req.body.addressStreetName;
  let addressCity = req.body.addressCity;
  let addressProvince = req.body.addressProvince;
  let addressCountry = req.body.addressCountry;
  let addressPostalCode = req.body.addressPostalCode;
  let phone1 = req.body.phone1;
  let phone2 = req.body.phone2;
  if (!password || password.length === 0) {
    res.status(400).json(`Password may not be blank.`);
  }
  let newAccount = { _id: id, email: email, password: password };
  if (userName) newAccount.userName = userName;
  if (givenName) newAccount.givenName = givenName;
  if (surName) newAccount.surName = surName;
  let address = {};
  if (addressHouseNum) address.HouseNum = addressHouseNum;
  if (addressStreetName) address.StreetName = addressStreetName;
  if (addressProvince) address.Province = addressProvince;
  if (addressCity) address.City = addressCity;
  if (addressCountry) address.Country = addressCountry;
  if (addressPostalCode) address.PostalCode = addressPostalCode;
  if (Object.keys(address).length > 0) newAccount.address1 = address;
  if (phone1) newAccount.phone1 = phone1;
  if (phone2) newAccount.phone2 = phone2;
  users.push(newAccount);
  userInfo = users.find((element) => element.email === email);
  if (userInfo) {

    let ordersKeys = Object.keys(orders);
    let foundOrder = ordersKeys.find((key) => key === email);
    if (!foundOrder) {
      let newOrders = { _id: id ,currentCart: {}, orderHistory: [] };
      orders.push(newOrders);
    }
    res.status(200).json(userInfo);
  } else {
    res.status(500).json("Internal error.");
  }
};

const handleGetOrders = (req, res) => {
  let email = req.params.email.toLowerCase();
  let userInfo = users.find(element => element.email === email);
  if (!userInfo || !userInfo._id) {
    res.status(400).json(`No account linked to email address: ${email}, was found.`)
  }
  let userOrders = orders.find(element => element._id === userInfo[_id]);

  // const userOrders = userOrders;
  if (!userOrders) {
    res.status(400).json(`${email} does not have existing orders...`);
  } else {
    res.status(200).json(userOrders);
  }
};

const handleMergeCartGetOrders = (req, res) => {
  let incomingCart = req.body.currentCart;
  let email = req.params.email.toLowerCase();
  let incomingKeys = Object.keys(incomingCart);

  let userInfo = users.find((element) => element.email === email);
  if (!userInfo || !userInfo._id) {
    res.status(400).json(`Error accessing ${email}'s information.`);
  }
  let userOrders = orders.find(element => element._id === userInfo[_id]);
  if (!userOrders) {
    res
      .status(400)
      .json(`User name ${userName} does not have existing orders...`);
  } 
  if (incomingKeys.length === 0) {
    res.status(200).json({userOrders: userOrders});
  }
  // case below: user has added items to cart before logging in but their account's cart is empty
  else if (
    incomingKeys.length > 0 &&
    Object.keys(userOrders.currentCart).length === 0
  ) {
    userOrders.currentCart = incomingCart;
    res.status(200).json({userOrders: userOrders});
  }
  // case below: user added items to cart before logging in and they already have unpurchased items in their account from another time
  else if (
    incomingKeys.length > 0 &&
    Object.keys(userOrders.currentCart).length > 0
  ) {
    let userCurrentCartKeys = Object.keys(userOrders.currentCart);
    let itemsWithReducedQuantities = [];
    incomingKeys.forEach((incId) => {
      let foundKeyInUserOrder = userCurrentCartKeys.find(
        (previousId) => previousId === incId
      );
      if (!foundKeyInUserOrder) {
        userOrders.currentCart[incId] = incomingCart[incId];
      }
      // the item has been ordered before
      else {
        // test available quantity, first case: store has enough, second: store does not have sufficient inventory
        let itemInfo = items.find((element) => element._id === parseInt(incId));
        if (
          itemInfo.numInStock >=
          parseInt(incomingCart[incId].quantity) +
            parseInt(userOrders.currentCart[incId].quantity)
        ) {
          userOrders.currentCart[incId].quantity = (
            parseInt(incomingCart[incId].quantity) +
            parseInt(userOrders.currentCart[incId].quantity)
          ).toString();
        } else {
          userOrders.currentCart[
            incId
          ].quantity = itemInfo.numInStock.toString();
          itemsWithReducedQuantities.push(incId);
        }
      }
    });
    res.status(200).json({
      userOrders: userOrders,
      itemsWithReducedQuantities: itemsWithReducedQuantities,
    });
  }
  // catch all error... should not occur
  else {
    res.status(400).json(`Unknown error.`);
  }
};

const handleAddItem = (req, res) => {
  let email = req.params.email.toLowerCase();
  let itemId = req.params.itemId;
  let quantity = req.params.quantity;
  let itemInfo = items.find((element) => element._id === parseInt(itemId));

  let userInfo = users.find((element) => element.email === email);
  if (!userInfo || !userInfo._id) {
    res.status(400).json(`No account linked to email address: ${email}, was found.`)
  }
  let userOrders = orders.find(element => element._id === userInfo[_id]);
  if (!userOrders) {
    res
      .status(400)
      .json(`No orders linked to email address: ${email}, was found.`);
  }

  if (!itemInfo) {
    res.status(400).json(`Item number ${itemId} not found.}`);
  } else if (userOrders.currentCart) {
    if (userOrders.currentCart[itemId]) {
      if (
        parseInt(quantity) +
          parseInt(userOrders.currentCart[itemId].quantity) >
        itemInfo.numInStock
      ) {
        res
          .status(409)
          .json(`Insufficient quantity of item id ${itemId} in stock.`);
      } else {
        userOrders.currentCart[itemId] = {
          itemInfo: itemInfo,  // made a change here
          quantity: (
            parseInt(quantity) +
            parseInt(userOrders.currentCart[itemId].quantity)
          ).toString(),
        };
        res.status(200).json(userOrders.currentCart[itemId]);
      }
    } else if (parseInt(quantity) > itemInfo.numInStock) {
      res
        .status(409)
        .json(`Insufficient quantity of item id ${itemId} in stock.`);
    } else {
      userOrders.currentCart[itemId] = {
        itemInfo: itemInfo,
        quantity: parseInt(quantity),
      };
      res.status(200).json(userOrders.currentCart[itemId]);
    }
  } else {
    res.status(400).json(`Unknown error.`);
  }
};

const handleRemoveItem = (req, res) => {
  let email = req.params.email.toLowerCase();
  let itemId = req.params.itemId;
  let quantity = req.params.quantity;
  let itemInfo = items.find((element) => element._id === parseInt(itemId));

  let userInfo = users.find((element) => element.email === email);
  if (!userInfo || !userInfo._id) {
    res.status(400).json(`Error accessing ${email}'s information.`);
  }
  let userOrders = orders.find(element => element._id === userInfo[_id]);
  if (!userOrders) {
    res
      .status(400)
      .json(`User name ${userName} does not have existing orders...`);
  } 

  if (!itemInfo) {
    res.status(400).json(`Item number ${itemId} not found.}`);
  } else if (!userOrders) {
    res
      .status(400)
      .json(`Account linked to: ${email}, does not have any orders...`);
  } else if (userOrders.currentCart) {
    if (
      parseInt(userOrders.currentCart[itemId].quantity) < parseInt(quantity)
    ) {
      res
        .status(400)
        .json(
          `Error: requested to remove ${quantity} of item id ${itemId} when there are only ${userOrders.currentCart[itemId].quantity} to be removed.`
        );
    } else if (
      parseInt(userOrders.currentCart[itemId].quantity) ===
      parseInt(quantity)
    ) {
      delete userOrders.currentCart[itemId];
      res.status(200).json(userOrders.currentCart);
    } else if (
      parseInt(userOrders.currentCart[itemId].quantity) > parseInt(quantity)
    ) {
      let currentQuantity = parseInt(
        userOrders.currentCart[itemId].quantity
      );
      let newQuantity = currentQuantity - parseInt(quantity);
      newQuantity = newQuantity.toString();
      userOrders.currentCart[itemId] = {
        itemInfo: itemInfo,
        quantity: parseInt(newQuantity),
      };
      res.status(200).json(userOrders.currentCart[itemId]);
    } else {
      res.status(400).json(`Unknown error.`);
    }
  } else {
    res.status(400).json(`Unknown error.`);
  }
};

const handleEmptyCart = (req, res) => {
  let email = req.params.email.toLowerCase();

  let userInfo = users.find((element) => element.email === email);
  if (!userInfo || !userInfo._id) {
    res.status(400).json(`Error accessing ${email}'s information.`);
  }
  let userOrders = orders.find(element => element._id === userInfo[_id]);
  if (!userOrders) {
    res
      .status(400)
      .json(`User name ${userName} does not have existing orders...`);
  } 

  if (!userOrders) {
    res
      .status(400)
      .json(`Account linked to: ${email}, does not have any orders...`);
  } else {
    userOrders.currentCart = {};
    res.status(200).json(userOrders.currentCart);
  }
};

const handlePurchase = (req, res) => {
  let email = req.params.email.toLowerCase();
  if (!email) {
    // console.log('11111111111111111111111111111');
    res.status(400).json("Email must be provided.");
  }
  let userInfo = users.find((element) => element.email === email);
  if (!userInfo || !userInfo._id) {
    res.status(400).json(`Error accessing ${email}'s information.`);
  }
  let userOrders = orders.find(element => element._id === userInfo[_id]); 
  if (!userOrders) {
    // console.log('2222222222222222222222222222');
    res
      .status(400)
      .json(`Account linked to: ${email}, does not have any orders...`);
  } else if (Object.keys(userOrders.currentCart).length === 0) {
    // console.log('33333333333333333333333');
    res.status(400).json(`Nothing in the shopping cart to purchase`);
  } else if (Object.keys(userOrders.currentCart).length > 0) {
    let cartKeys = Object.keys(userOrders.currentCart);
    let notFoundError = false;
    let insufficient = false;
    let insufficientItems = [];
    cartKeys.forEach((id) => {
      let idInt = parseInt(id);
      let itemInStore = items.find((element) => element._id === idInt);
      if (!itemInStore) {
        notFoundError = true;
      }
      if (
        parseInt(userOrders.currentCart[id].quantity) >
        itemInStore.numInStock
      ) {
        insufficient = true;
        insufficientItems.push(id);
      }
    });
    if (notFoundError) {
      // console.log('55555555555555555555');
      res
        .status(400)
        .json(`An item inside the cart was not found in the store`);
    } else if (insufficient) {
      // console.log('6666666666666666666666');
      res.status(400).json(insufficientItems);
    } else {
      let addAddress = req.body.addAddress;
      let addressHouseNum = req.body.addressHouseNum;
      let addressStreetName = req.body.addressStreetName;
      let addressCity = req.body.addressCity;
      let addressProvince = req.body.addressProvince;
      let addressCountry = req.body.addressCountry;
      let addressPostalCode = req.body.addressPostalCode;
      if (
        addAddress === undefined ||
        !addressHouseNum ||
        !addressStreetName ||
        !addressCity ||
        !addressProvince ||
        !addressCountry ||
        !addressPostalCode
      ) {
        // console.log('777777777777777777777777');
        res.status(400).json("Address is incomplete");
        
      }
      let creditCardType = req.body.creditCardType;
      let creditCardNumber = req.body.creditCardNumber;
      let expirationMonth = req.body.expirationMonth;
      let expirationYear = req.body.expirationYear;
      let srcNumber = req.body.srcNumber;
      let subTotal = req.body.subTotal;
      let provTaxCost = req.body.provTaxCost;
      let fedTaxCost = req.body.fedTaxCost;
      let shippingCost = req.body.shippingCost;
      let totalCost = req.body.totalCost;
      if (
        !creditCardType ||
        !creditCardNumber ||
        !expirationMonth ||
        !expirationYear ||
        !srcNumber ||
        !subTotal ||
        !provTaxCost ||
        !fedTaxCost ||
        !shippingCost ||
        !totalCost
      ) {
        // console.log('88888888888888888888888');
        res.status(400).json("Shipping details are incomplete");
        
      }
      let address = {
        HouseNum: addressHouseNum,
        StreetName: addressStreetName,
        City: addressCity,
        Province: addressProvince,
        Country: addressCountry,
        PostalCode: addressPostalCode,
      };
      let shippingInfo = {
        creditCardType : creditCardType,
        creditCardNumber : creditCardNumber,
        expirationMonth : expirationMonth,
        expirationYear : expirationYear,
        srcNumber : srcNumber,
        subTotal : subTotal,
        provTaxCost : provTaxCost,
        fedTaxCost : fedTaxCost,
        shippingCost : shippingCost,
        totalCost : totalCost,
      }
      // addAddress should only be available if the user is logged in, and, if true, adds the given address into the user's profile information
      if (addAddress) {
        let foundNewAddressIndex = false;
        let i = 1;
        let nextAddressNum = `address${i}`;
        while (!foundNewAddressIndex) {
          let potentialFind = userInfo[nextAddressNum];
          if (!potentialFind) foundNewAddressIndex = true;
          else {
            i++;
            nextAddressNum = `address${i}`;
          }
        }
        userInfo[nextAddressNum] = address;
      }
      userOrders.currentCart.shippingAddress = address;
      userOrders.currentCart.shippingInfo = shippingInfo;
      cartKeys.forEach((id) => {
        let idInt = parseInt(id);
        let itemInStore = items.find((element) => element._id === idInt);
        itemInStore.numInStock -= parseInt(
          userOrders.currentCart[id].quantity
        );
      });
      let date = Date();
      let randNum = Math.floor(Math.random() * 100000);
      let orderId = `${date} - ${randNum}`;
      userOrders.orderHistory.push({ [orderId]: userOrders.currentCart });
      userOrders.currentCart = {};
      // console.log('200200200200200200200200200');
      res.status(200).json({ orderId: orderId, orders: userOrders, user: userInfo, items: items });
    }
  } else {
    // console.log('999999999999999999');
    res.status(400).json(`Unknown error.`);
  }
};

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // retrieves items that vendor has for sale (regardless of quantity in stock)
  .get("/getStore", handleGetStore)

  // retrieves information about the vendors
  .get("/getVendors", handleGetVendors)

  // provided the correct password: retrieves user's profile info
  .post("/logIn/:email", handleLogIn)
  // Body has shape: {
  // password:
  // }

  // retrieves user's order info
  .get("/getOrders/:email", handleGetOrders)

  // creates a new account
  .post("/createAccount/:email", handleCreateAccount)
  // Body has shape: {
  // password:
  // userName:
  // givenName:
  // surName:
  // addressHouseNum:
  // addressStreetName:
  // addressCity:
  // addressProvince:
  // addressCountry:
  // addressPostalCode:
  // phone1:
  // phone2:
  // }
  // password is mandatory, the rest are not

  // could make apis to change password, shipping address, etc.  Seems outside the scopt of this exercise

  // merges current cart into signed in one's
  .post("/mergeCartGetOrders/:email", handleMergeCartGetOrders)
  // Body has shape: {
  // currentCart:
  // }

  // adds an item to cart or increases its quantity
  .get("/addItem/:email/:itemId/:quantity", handleAddItem)

  // removes some or all cases of an item from a cart
  .put("/removeItem/:email/:itemId/:quantity", handleRemoveItem)

  // removes all items from cart
  .put("/emptyCart/:email", handleEmptyCart)

  .post("/purchase/:email", handlePurchase)
  // The endpoint above: tests stock, if sufficient it reduces the stock.  Generates a semi-random orderNumber.
  // moves the currentCart into the orderHistory in an object as the value of the key: orderNumber.
  // Body has shape: {
  // addAddress:
  // addressHouseNum:
  // addressStreetName:
  // addressCity:
  // addressProvince:
  // addressCountry:
  // addressPostalCode:

  // creditCardType :
  // creditCardNumber :
  // expirationMonth :
  // expirationYear :
  // srcNumber :
  // subTotal :
  // provTaxCost :
  // fedTaxCost :
  // shippingCost:
  // totalCost :
  // }
  // All these fields are mandatory
  // addAddress is a boolean
  // this post returns the orderID number, the userData, the orders associated with the given email address and the new items data (changed NumInStocks)

  // NEW END POINTS AFTER CONNECTING TO MONGO
  .get("/mongo/getStore", getItemInfo)
  .get("/mongo/getVendors", getVendorInfo)
  .post("/mongo/logIn/:email", getUserInfo)
  .post("/mongo/createAccount/:email", postCreateAccount)
  .get("/mongo/getOrders/:email", getOrders)
  .post("/mongo/mergeCartGetOrders/:email", postMergeCartGetOrders) //unfinished
  .get("/mongo/addItem/:email/:itemId/:quantity", getAddItem)
  .put("/mongo/removeItem/:email/:itemId/:quantity", putRemoveItem)
  .put("/mongo/emptyCart/:email", putEmptyCart)
  .post("/mongo/purchase/:email", postPurchase)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));