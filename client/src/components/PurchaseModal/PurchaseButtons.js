import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { PurchaseContext } from "../../purchaseContext";
import Cart from "../Cart";

// import {
//   resetErrorStatus,
//   requestEmptyCart,
//   emptyCartSuccess,
//   emptyCartError
// } from "../../actions";

const PurchaseButtons = () => {
  const {
    purchaseModalVisible,
    setPurchaseModalVisible,
    itemsQuantityInCart,
    setItemsQuantityInCart,
    subTotalInCart,
    setSubTotalInCart,
  } = React.useContext(PurchaseContext);

  const currentCart = useSelector((state) => state.orders.currentCart);
  const cartStatus = useSelector((state) => state.orders.status);

  if (Object.keys(currentCart).length === 0) {
    setItemsQuantityInCart(0);
    setSubTotalInCart(0);
  }

  const handleClick = () => {
    setPurchaseModalVisible(2);
  };

  return (
    <Wrapper>
      <PriceWrapper>
        <PriceDisplay>
          <LeftText>Total items:</LeftText>
          <Value>{itemsQuantityInCart}</Value>
        </PriceDisplay>
        <PriceDisplay>
          <LeftText>SubTotal:</LeftText>
          <Value>{subTotalInCart}</Value>
        </PriceDisplay>
        {purchaseModalVisible === 1 ? (
          <StyledButton onClick={handleClick}>CONTINUE</StyledButton>
        ) : (
          // null
          "Show values based on taxes."
        )}
        {/* <PriceDisplay>
          <LeftText>
            State Dependent Tax Example: 
          </LeftText>
          <Value>
            {sumPrice * 0.1}
          </Value>
        </PriceDisplay> */}
      </PriceWrapper>
    </Wrapper>
  );
};

export default PurchaseButtons;

const Value = styled.div`
  font-weight: bold;
  margin-left: 10px;
`;
const LeftText = styled.div``;

const PriceDisplay = styled.div`
  display: flex;
  flex-direction: row;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  cursor: pointer;
  background-color: black;
  color: white;
  padding: 5px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: white;
  height: fill;
  width: 50%;
  min-height: 400px;
  /* border: 1px solid black; */
  margin: 50px 25%;
  z-index: 10;
  /* position: absolute; */
`;
