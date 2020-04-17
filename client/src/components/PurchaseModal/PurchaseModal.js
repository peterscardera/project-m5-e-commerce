import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { PurchaseContext } from "../../purchaseContext";

import Cart from "./Cart";
import PurchaseNavBar from "./PurchaseNavBar";
import PurchaseButtons from "./PurchaseButtons";
import AddressChoices from "./AddressChoices";
import NewAddress from "./NewAddress";
import Payment from "./Payment";
import Confirmation from "./Confirmation";

// import {
//   resetErrorStatus,
//   requestEmptyCart,
//   emptyCartSuccess,
//   emptyCartError
// } from "../../actions";

const PurchaseModal = () => {
  const {
    purchaseModalVisible,
    setPurchaseModalVisible,
    shipToAddress,
    setShipToAddress,
  } = React.useContext(PurchaseContext);
  const currentCart = useSelector((state) => state.orders.currentCart);
  const cartStatus = useSelector((state) => state.orders.status);
  // const user = useSelector((state)=> state.user.user);

  const closePurchase = () => {
    setPurchaseModalVisible(0);
  };
  const handleClickPrev = () => {
    setPurchaseModalVisible(purchaseModalVisible - 1);
  };
  const handleClickNext = () => {
    if (PurchaseModal !== 3) {
      setPurchaseModalVisible(purchaseModalVisible + 1);
    }
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <PurchaseNavBar />
        {purchaseModalVisible === 1 && (
          <RowDiv>
            <Cart></Cart>
            <PurchaseButtons />
          </RowDiv>
        )}
        {purchaseModalVisible === 2 && (
          <RowDiv>
            <AddressChoices />
            <NewAddress />
          </RowDiv>
        )}
        {purchaseModalVisible === 3 && (
          <>
            <Payment />
          </>
        )}
        {purchaseModalVisible === 4 && (
          <>
            <Confirmation />
            <PurchaseButtons />
          </>
        )}
      </InnerContainer>
    </OuterContainer>
  );
};

export default PurchaseModal;

// background-color: ${props => (!props.clickStatus && !props.cartVisibilityPreHover) ? "rgba(0,255,0,0.5)" : "rgba(0,255,0,1)"};

const NextPrevButtons = styled.button`
  text-align: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: white;
  background: black;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  text-align: center;
  align-items: center;
  opacity: 1;
  background-color: white;
  height: fill;
  width: 50%;
  min-height: 400px;
  border: 1px solid black;
  margin: 50px 25%;
  z-index: 10;
  position: relative;
`;

const OuterContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
  height: 100vh;
  width: 100vw;
  z-index: 10;
`;
