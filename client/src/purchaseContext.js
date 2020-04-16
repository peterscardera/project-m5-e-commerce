import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const PurchaseContext = React.createContext()

export const PurchaseProvider = ({children}) => {
  let initialAddress = {
  address : '',
  houseNum : '',
  streetName : '',
  city : '',
  province : '',
  country : '',
  postalCode : '',
  }

  const [paymentInfo, setPaymentInfo] = useState({});
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