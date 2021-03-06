'use strict';

const { MongoClient } = require('mongodb');
const assert = require('assert');

const uri = "mongodb+srv://m001-student:---cluster0-sptak.azure.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const getItemInfo = async (req, res) => {

  await client.connect();
  const db = client.db('e-commerce');
  try {
    const result = await db.collection('items').find().toArray();
    if (!result || result.length === 0) {
      res.status(404).json({ status: 404, data: 'Not Found' });
    }
    else {
      res.status(200).json({ status: 200, data: result })
    }
  
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "error" });
  }
}


const getVendorInfo = async (req, res) => {

  await client.connect();
  const db = client.db('e-commerce');
  try {
    const result = await db.collection('vendors').find().toArray();
    if (!result || result.length === 0) {
      res.status(404).json({ status: 404, data: 'Not Found' });
    }
    else {
      res.status(200).json({ status: 200, data: result })
    }
  
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "error" });
  }
}

const getUserInfo = async (req, res) => {

  const email = req.params.email;
  await client.connect();
  const db = client.db('e-commerce');
  
  try {
    const result = await db.collection('users').findOne({ email: email });
    if (!result || result.length === 0) {
      res.status(404).json({ status: 404, user: 'Not Found' });
    }
    else {
      res.status(200).json({ status: 200, user: result })
    }
  
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "error" });
  }
};

const postCreateAccount = async (req, res) => {
  let email = req.params.email.toLowerCase();
  await client.connect();
  const db = client.db('e-commerce');
  try {
    const result = await db.collection('users').findOne({ email: email });
    if (result) {
      res.status(403).json(`Email address: ${email} already has an account.`);
    }
    else {
      const userCount = await db.collection('users').count();
     
      let id = userCount + 1;
      if (id < 10) id = `000${id}`;
      else if (id < 100) id = `00${id}`;
      else if (id < 1000) id = `0${id}`;
      else id = `${id}`;
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
      const r1 = await db.collection('users').insertOne(newAccount);
      assert.equal(1, r1.insertedCount);
      // no longer accomodating capacity to fetch previous orders from a user w/o account
      // let ordersKeys = Object.keys(orders);
      // let foundOrder = ordersKeys.find((key) => key === email);
      // if (!foundOrder) {
      let newOrders = { _id: id ,currentCart: {}, orderHistory: [] };
      const r2 = await db.collection('orders').insertOne(newOrders);
      assert.equal(1, r2.insertedCount);
      res.status(200).json(newAccount);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "error" });
  }
}
const getOrders = async (req, res) => {

  const email = req.params.email;
  
  await client.connect();
  const db = client.db('e-commerce');
  
  try {
    const userInfo = await db.collection('users').findOne({ email: email });
    if (!userInfo) {
      res.status(404).json({user: 'Not Found' });
    }
    else {
      let user_id = userInfo._id;
      const orderInfo = await db.collection('orders').findOne({ _id: user_id });
      if (!orderInfo) {
        res.status(404).json({orders: 'Not Found'});
      }
      else {
        res.status(200).json({ orders: orderInfo })
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "error" });
  }
};

const getAddItem = async (req, res) => {

  await client.connect();
  const db = client.db('e-commerce');
  let email = req.params.email.toLowerCase();
  let itemId = req.params.itemId;
  let quantity = req.params.quantity;
  
  let itemIdToInt = parseInt(itemId);
  

  const itemInfo = await db.collection('items').findOne({ _id: itemIdToInt });
 
    if (!itemInfo) {
      res.status(404).json({item: 'Item not found' });
    }
    else {
      const userInfo = await db.collection('users').findOne({ email: email });
  
      if (!userInfo) {
        res.status(404).json({user: 'Not Found' });
      }
      else {
        let user_id = userInfo._id;
        const userOrders = await db.collection('orders').findOne({ _id: user_id });
      
        if (!userOrders) {
          res.status(404).json({orders: 'Not Found'});
        }
        else {
          if (userOrders.currentCart) {
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
                  ),
                };
                const query = { _id : userOrders._id };
                const newValues = { $set: { currentCart: userOrders.currentCart } };
                const r = await db.collection('orders').updateOne(query, newValues);
                assert.equal(1, r.matchedCount);
                assert.equal(1, r.modifiedCount);
              
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
              const query = { _id : userOrders._id };
              const newValues = { $set: { currentCart: userOrders.currentCart } };
              const r = await db.collection('orders').updateOne(query, newValues);
              assert.equal(1, r.matchedCount);
              assert.equal(1, r.modifiedCount);
            
              res.status(200).json(userOrders.currentCart[itemId]);
            }
          } else {
            res.status(400).json(`Unknown error.`);
          }
        }
      }
    }
}

const putRemoveItem = async ( req, res ) => {
  let email = req.params.email.toLowerCase();
  let itemId = req.params.itemId;
  let quantity = req.params.quantity;
  let itemIdToInt = parseInt(itemId);

  await client.connect();
  const db = client.db('e-commerce');

  const itemInfo = await db.collection('items').findOne({ _id: itemIdToInt });
   
    if (!itemInfo) {
      res.status(404).json({item: 'Item not found' });
    }
    else {
      const userInfo = await db.collection('users').findOne({ email: email });
    
      if (!userInfo) {
        res.status(404).json(`Error accessing ${email}'s information.`);
      }
      else {
        let user_id = userInfo._id;
        const userOrders = await db.collection('orders').findOne({ _id: user_id });
        if (!userOrders) {
          res.status(404).json({orders: 'Not Found'});
        }
        else if (userOrders.currentCart) {
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
            const query = { _id : user_id };
            const newValues = { $set: { currentCart: userOrders.currentCart}};
            const r = await db.collection('orders').updateOne(query, newValues);
            assert.equal(1, r.matchedCount);
            assert.equal(1, r.modifiedCount);
            // const r = await db.collection('orders').deleteOne({ _id: user_id, currentCart:[itemId] });
            // assert.equal(1, r.deletedCount);
            res.status(200).json(userOrders.currentCart);
          } else if (
            parseInt(userOrders.currentCart[itemId].quantity) > parseInt(quantity)
          ) {
            let currentQuantity = parseInt(
              userOrders.currentCart[itemId].quantity
            );
            let newQuantity = currentQuantity - parseInt(quantity);
            // let newCurrentCart = {...userOrders.currentCart, currentCart[itemId] :   }

            const query = { _id : userOrders._id };
            const newValues = { $set: { currentCart: { [itemId] : { itemInfo: userOrders.currentCart[itemId].itemInfo, quantity : newQuantity}}}};
            const r = await db.collection('orders').updateOne(query, newValues);
            assert.equal(1, r.matchedCount);
            assert.equal(1, r.modifiedCount);
            res.status(200).json(userOrders.currentCart[itemId]);
          } else {
            res.status(400).json(`Unknown error.`);
          }
        } else {
          res.status(400).json(`Unknown error.`);
        }
      }
    }
}

const postMergeCartGetOrders = async (req , res) => {
  let incomingCart = req.body.currentCart;
  let email = req.params.email.toLowerCase();
  let incomingKeys = Object.keys(incomingCart);
  await client.connect();
  const db = client.db('e-commerce');

  const userInfo = await db.collection('users').findOne({ email: email });
  
  if (!userInfo) {
    res.status(404).json(`Error accessing ${email}'s information.`);
  }
  else {
    let user_id = userInfo._id;
    const userOrders = await db.collection('orders').findOne({ _id: user_id });
    if (!userOrders) {
      res.status(404).json({orders: 'Not Found'});
    }
    else if (incomingKeys.length === 0) {
    res.status(200).json({userOrders: userOrders});
  }
  // case below: user has added items to cart before logging in but their account's cart is empty
  else if (
    incomingKeys.length > 0 &&
    Object.keys(userOrders.currentCart).length === 0
  ) {
    const query = { _id : userOrders._id };
    const newValues = { $set: { currentCart: incomingCart}};
    const r = await db.collection('orders').updateOne(query, newValues);
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    userOrders.currentCart = incomingCart;
    res.status(200).json({userOrders: userOrders});
  }


  // case below: user added items to cart before logging in and they already have unpurchased items in their account from another time
  // else if (
  //   incomingKeys.length > 0 &&
  //   Object.keys(userOrders.currentCart).length > 0
  // ) {
  //   let userCurrentCartKeys = Object.keys(userOrders.currentCart);
  //   let itemsWithReducedQuantities = [];
  //   incomingKeys.forEach((incId) => {
  //     let foundKeyInUserOrder = userCurrentCartKeys.find(
  //       (previousId) => previousId === incId
  //     );
  //     if (!foundKeyInUserOrder) {
  //       userOrders.currentCart[incId] = incomingCart[incId];
  //     }
  //     // the item has been ordered before
  //     else {
  //       // test available quantity, first case: store has enough, second: store does not have sufficient inventory
  //       let itemInfo = items.find((element) => element._id === parseInt(incId));
  //       if (
  //         itemInfo.numInStock >=
  //         parseInt(incomingCart[incId].quantity) +
  //           parseInt(userOrders.currentCart[incId].quantity)
  //       ) {
  //         userOrders.currentCart[incId].quantity = (
  //           parseInt(incomingCart[incId].quantity) +
  //           parseInt(userOrders.currentCart[incId].quantity)
  //         ).toString();
  //       } else {
  //         userOrders.currentCart[
  //           incId
  //         ].quantity = itemInfo.numInStock.toString();
  //         itemsWithReducedQuantities.push(incId);
  //       }
  //     }
  //   });
  //   res.status(200).json({
  //     userOrders: userOrders,
  //     itemsWithReducedQuantities: itemsWithReducedQuantities,
  //   });
  // }
  // catch all error... should not occur
  else {
    res.status(400).json(`Unknown error.`);
  }}
}

const putEmptyCart = async (req, res) => {
  let email = req.params.email.toLowerCase();

  await client.connect();
  const db = client.db('e-commerce');

  const userInfo = await db.collection('users').findOne({ email: email });
  if (!userInfo) {
    res.status(404).json(`Error accessing ${email}'s information.`);
  }
  else { 
    let user_id = userInfo._id;
    const userOrders = await db.collection('orders').findOne({ _id: user_id });
    if (!userOrders) {
      res.status(404).json({orders: 'Not Found'});
    }
    else {
      const query = { _id : userOrders._id };
      const newValues = { $set: { currentCart: {}}};
      const r = await db.collection('orders').updateOne(query, newValues);
      assert.equal(1, r.matchedCount);
      assert.equal(1, r.modifiedCount);
      res.status(200).json({});
    }
  }
}

const postPurchase = async (req, res) => {
  await client.connect();
  const db = client.db('e-commerce');
  let email = req.params.email.toLowerCase();
  if (!email) {
   
    res.status(400).json("Email must be provided.");
    return
  }
  const userInfo = await db.collection('users').findOne({ email: email });
  if (!userInfo) {
    res.status(404).json(`Error accessing ${email}'s information.`);
    return
  }
  else { 
    let user_id = userInfo._id;
    const userOrders = await db.collection('orders').findOne({ _id: user_id });
    let cartKeys = Object.keys(userOrders.currentCart);
    if (!userOrders) {
      res.status(404).json({orders: 'Not Found'});
      return
    }
    else if (cartKeys.length === 0) {
      res.status(400).json(`Nothing in the shopping cart to purchase`);
    } else if (cartKeys.length > 0) {
      let notFoundError = false;
      let insufficient = false;
      let insufficientItems = [];
      await cartKeys.forEach( async (id) => {
        try {
          let idInt = parseInt(id);
          const itemInfo = await db.collection('items').findOne({ _id: idInt });
            if (!itemInfo) {
              notFoundError = true;
            }
            let testNum = parseInt(userOrders.currentCart[id].quantity);// PROBLEM HERE CAN NOT READ PROPERTY QUANTITY OF UNDEFINED
            if ( testNum > itemInfo.numInStock) {
              insufficient = true;
              insufficientItems.push(idInt);
            }
          } catch (err) {
            console.log('err from try in test',err);
          }
      });
        if (notFoundError) {
          return res.status(400).json(`Item id:${idInt} not found`);
        } else if (insufficient) {
          return res.status(400).json(insufficientItems);
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
          return res.status(400).json("Address is incomplete");

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
          return res.status(400).json("Shipping details are incomplete");
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
          const query = { _id : userOrders._id };
          const newValues = { userInfo : userInfo };
          const r = await db.collection('users').updateOne(query, newValues);
          assert.equal(1, r.matchedCount);
          assert.equal(1, r.modifiedCount);
        }
        userOrders.currentCart.shippingAddress = address;
        userOrders.currentCart.shippingInfo = shippingInfo;

        // let updatesToDo = {};
        cartKeys.forEach( async (id) => {
          let idInt = parseInt(id);
          const itemInStore = await db.collection('items').findOne({ _id: idInt });
          itemInStore.numInStock -= parseInt(
            userOrders.currentCart[id].quantity
          );
          const query = { _id : idInt };
          const newValues = {$set: {...itemInStore}};
          const r = await db.collection('items').updateOne(query, newValues);
          assert.equal(1, r.matchedCount);
          assert.equal(1, r.modifiedCount);
        });
        let date = Date();
        let randNum = Math.floor(Math.random() * 100000);
        let orderId = `${date} - ${randNum}`;
        let userOrdersCopy = {...userOrders, currentCart: {}};
        userOrdersCopy.orderHistory.push({ [orderId]: userOrders.currentCart });
        const query = { _id : userInfo._id };
        const newValues = {$set: {...userOrdersCopy}};
        try {const r = await db.collection('orders').updateOne(query, newValues);
          assert.equal(1, r.matchedCount);
          assert.equal(1, r.modifiedCount);
        } catch (err) {
          return res.status(400).json(`Could not update orders`);
        }
        let items = {};
        try { items = await db.collection('items').find().toArray();
        } catch (err) {
          return res.status(400).json(`Could not get items`);
        }
        return res.status(200).json({ orderId: orderId, orders: userOrdersCopy, user: userInfo, items: items });
      }
    } else {
      return res.status(400).json(`Unknown error.`);
    }
  }
}

module.exports = {
  getUserInfo,
  getItemInfo,
  getVendorInfo,
  postCreateAccount,
  getOrders,
  getAddItem,
  putRemoveItem,
  postMergeCartGetOrders,
  putEmptyCart,
  postPurchase
};
