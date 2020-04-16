import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import {PurchaseContext} from  '../../purchaseContext';
import Cart from '../Cart';


const NewAddress = () => {
  const { 
    purchaseModalVisible, 
    setPurchaseModalVisible, 
    shipToAddress,
    setShipToAddress, 
  } = React.useContext(PurchaseContext);
  const currentCart = useSelector((state) => state.orders.currentCart);
  const cartStatus = useSelector((state) => state.orders.status);



  return (
    <ColDiv>
      Insert Address Input Boxes Here
    </ColDiv>
  );
};

const ColDiv = styled.div`
  display: flex;
  flex-direction: row;
`

export default NewAddress;
