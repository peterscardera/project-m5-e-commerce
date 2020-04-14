import React, { useState } from 'react';

export const PurchaseContext = React.createContext()

export const PurchaseProvider = ({children}) => {
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  return (
    <PurchaseContext.Provider value={{ purchaseModalVisible, setPurchaseModalVisible }}>
      {children}
    </PurchaseContext.Provider>
  );
};