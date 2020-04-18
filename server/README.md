# Backend

You should document your endpoints in this file.

## retrieves items that vendor has for sale (regardless of quantity in stock)
.get("/getStore", handleGetStore)

## retrieves information about the vendors
.get("/getVendors", handleGetVendors)


## provided the correct password: retrieves user's profile info
.post("/logIn/:email", handleLogIn)
Body has shape: {
password:
}

## retrieves user's order info
.get("/getOrders/:email", handleGetOrders)

## creates a new account
.post("/createAccount/:email", handleCreateAccount)
Body has shape: {
password:
userName:
givenName:
surName:
addressHouseNum:
addressStreetName:
addressCity:
addressProvince:
addressCountry:
addressPostalCode:
phone1:
phone2:
}
password is mandatory, the rest are not

could make apis to change password, shipping address, etc.  Seems outside the scopt of this exercise

## merges current cart into signed in one's
.post("/mergeCartGetOrders/:email", handleMergeCartGetOrders)
Body has shape: {
currentCart:
}

## adds an item to cart or increases its quantity
.get("/addItem/:email/:itemId/:quantity", handleAddItem)

## removes some or all cases of an item from a cart
.put("/removeItem/:email/:itemId/:quantity", handleRemoveItem)


## removes all items from cart
.put("/emptyCart/:email", handleEmptyCart)

## The purchase post.  See below
.post("/purchase/:email", handlePurchase)
The endpoint above: tests stock, if sufficient it reduces the stock.  Generates a semi-random orderNumber.
moves the currentCart into the orderHistory in an object as the value of the key: orderNumber.
Body has shape: {
addAddress:
addressHouseNum:
addressStreetName:
addressCity:
addressProvince:
addressCountry:
addressPostalCode:
creditCardType :
creditCardNumber :
expirationMonth :
expirationYear :
srcNumber :
subTotal :
provTaxCost :
fedTaxCost :
shippingCost:
totalCost :
}
All these fields are mandatory
addAddress expects a boolean
this post returns the orderID number, the userData, the orders associated with the given email address and the newitems data (changed NumInStocks)