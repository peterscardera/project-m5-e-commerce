import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import {PurchaseContext} from  '../../purchaseContext';
import Cart from '../Cart';


const AddressChoices = () => {
  const { 
    purchaseModalVisible, 
    setPurchaseModalVisible, 
    shipToAddress,
    setShipToAddress, 
  } = React.useContext(PurchaseContext);
  const currentCart = useSelector((state) => state.orders.currentCart);
  const cartStatus = useSelector((state) => state.orders.status);



  return (
    <RowDiv>
      Insert Address Choices here
    </RowDiv>
  );
};

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`

export default AddressChoices;
