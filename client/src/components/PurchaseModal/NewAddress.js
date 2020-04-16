import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import {PurchaseContext} from  '../../purchaseContext';


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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50vh;
  min-height: 400px;
  margin: 20px;
`

export default NewAddress;
