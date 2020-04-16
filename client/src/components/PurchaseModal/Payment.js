import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import taxRates from "../../constants";
import {PurchaseContext} from  '../../purchaseContext';
import Cart from '../Cart';


const Payment = () => {
  const { purchaseModalVisible, setPurchaseModalVisible } = React.useContext(PurchaseContext);
  const currentCart = useSelector((state) => state.orders.currentCart);
  const cartStatus = useSelector((state) => state.orders.status);



  return (
    <div>
      Insert Payment options
    </div>
  );
};

export default Payment;
