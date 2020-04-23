const postPurchase = async (req, res) => {
  await client.connect();
  const db = client.db("e-commerce");
  let email = req.params.email.toLowerCase();
  if (!email) {
    res.status(400).json("Email must be provided.");
    return;
  }
  const userInfo = await db.collection("users").findOne({ email: email });
  if (!userInfo) {
    res.status(404).json(`Error accessing ${email}'s information.`);
    return;
  } else {
    let user_id = userInfo._id;
    const userOrders = await db.collection("orders").findOne({ _id: user_id });
    let cartKeys = Object.keys(userOrders.currentCart);
    if (!userOrders) {
      res.status(404).json({ orders: "Not Found" });
      return;
    } else if (cartKeys.length === 0) {
      res.status(400).json(`Nothing in the shopping cart to purchase`);
    } else if (cartKeys.length > 0) {
      let notFoundError = false;
      let insufficient = false;
      let insufficientItems = [];
      cartKeys.forEach(async (id) => {
        try {
          let idInt = parseInt(id);
          const itemInfo = await db.collection("items").findOne({ _id: idInt });
          if (!itemInfo) {
            notFoundError = true;
          }

          let testNum = parseInt(userOrders.currentCart[id].quantity); // PROBLEM HERE CAN NOT READ PROPERTY QUANTITY OF UNDEFINED
          if (testNum > itemInfo.numInStock) {
            insufficient = true;
            insufficientItems.push(idInt);
          }
        } catch (err) {
          console.log("errerrerrerrerrerrerrerrerrerrerrerrerr", err);
          console.log("WWWEEEEE GGGOOOOTT  AAAPPPPORRROBBLLLEEEMMMMM");
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
          // console.log('777777777777777777777777');
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
          creditCardType: creditCardType,
          creditCardNumber: creditCardNumber,
          expirationMonth: expirationMonth,
          expirationYear: expirationYear,
          srcNumber: srcNumber,
          subTotal: subTotal,
          provTaxCost: provTaxCost,
          fedTaxCost: fedTaxCost,
          shippingCost: shippingCost,
          totalCost: totalCost,
        };
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
          const query = { _id: userOrders._id };
          const newValues = { userInfo: userInfo };
          const r = await db.collection("users").updateOne(query, newValues);
          assert.equal(1, r.matchedCount);
          assert.equal(1, r.modifiedCount);
        }
        userOrders.currentCart.shippingAddress = address;
        userOrders.currentCart.shippingInfo = shippingInfo;

        cartKeys.forEach(async (id) => {
          let idInt = parseInt(id);
          const itemInStore = await db
            .collection("items")
            .findOne({ _id: idInt });
          itemInStore.numInStock -= parseInt(
            userOrders.currentCart[id].quantity
          );
          const query = { _id: idInt };
          const newValues = itemInStore;
          const r = await db.collection("items").updateOne(query, newValues);
          assert.equal(1, r.matchedCount);
          assert.equal(1, r.modifiedCount);
        });
        let date = Date();
        let randNum = Math.floor(Math.random() * 100000);
        let orderId = `${date} - ${randNum}`;
        userOrders.orderHistory.push({ [orderId]: userOrders.currentCart });
        userOrders.currentCart = {};
        const query = { _id: userInfo._id };
        const newValues = userOrders;
        try {
          const r = await db.collection("orders").updateOne(query, newValues);
          assert.equal(1, r.matchedCount);
          assert.equal(1, r.modifiedCount);
        } catch (err) {
          return res.status(400).json(`Could not update orders`);
        }
        let items = {};
        try {
          items = await db.collection("items").find().toArray();
        } catch (err) {
          return res.status(400).json(`Could not get items`);
        }
        return res
          .status(200)
          .json({
            orderId: orderId,
            orders: userOrders,
            user: userInfo,
            items: items,
          });
      }
    } else {
      return res.status(400).json(`Unknown error.`);
    }
  }
};
