import React, { useState } from 'react';

export const PurchaseContext = React.createContext()

export const PurchaseProvider = ({children}) => {
  let initialAddress = {
  address : null,
  houseNum : null,
  streetName : null,
  city : null,
  province : null,
  country : null,
  postalCode : null,
  }

  let initialPaymentInfo = {
    creditCardType : null,
    creditCardNumber : null,
    expirationMonth : null,
    expirationYear : null,
    srcNumber : null,
    subTotal : null,
    provTaxCost : null,
    fedTaxCost : null,
    shippingCost: null,
    totalCost : null,
  }

  const [paymentInfo, setPaymentInfo] = useState(initialPaymentInfo);
  const [shipToAddress , setShipToAddress] = useState(initialAddress);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(0);
  const [itemsQuantityInCart, setItemsQuantityInCart] = useState(0);
  const [subTotalInCart, setSubTotalInCart] = useState(0);

  return (
    <PurchaseContext.Provider value={{
      paymentInfo,
      setPaymentInfo,
      shipToAddress,
      setShipToAddress,
      purchaseModalVisible, 
      setPurchaseModalVisible, 
      itemsQuantityInCart, 
      setItemsQuantityInCart, 
      subTotalInCart, 
      setSubTotalInCart 
    }}>
      {children}
    </PurchaseContext.Provider>
  );
};