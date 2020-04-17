import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import {PurchaseContext} from  '../../purchaseContext';
import Cart from '../Cart';


const Confirmation = () => {
  const { purchaseModalVisible, 
    setPurchaseModalVisible,
    lastConfirmedOrderNum,
  } = React.useContext(PurchaseContext);
  const currentCart = useSelector((state) => state.orders.currentCart);
  const cartStatus = useSelector((state) => state.orders.status);



  return (
    <>
      <div>
        Thank you for your purchase!
      </div>
      <div>
        Your order date and id are:
      </div>
      <h2>
        {lastConfirmedOrderNum}
      </h2>
    </>
  );
};

export default Confirmation;
