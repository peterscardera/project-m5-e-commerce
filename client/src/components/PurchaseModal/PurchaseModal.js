import React from "react";
import styled from "styled-components";

import { PurchaseContext } from "../../purchaseContext";

import Cart from "./Cart";
import PurchaseNavBar from "./PurchaseNavBar";
import PurchaseButtons from "./PurchaseButtons";
import AddressChoices from "./AddressChoices";
import NewAddress from "./NewAddress";
import Payment from "./Payment";
import Confirmation from "./Confirmation";

const PurchaseModal = () => {
  const { purchaseModalVisible } = React.useContext(PurchaseContext);

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

// background-color: ${props => (!props.clickStatus && !props.cartVisibilityPreHover) ? "rgba(0,255,0,0.5)" : "rgba(0,255,0,1)"};

// const NextPrevButtons = styled.button`
//   text-align: center;
//   width: 20px;
//   height: 20px;
//   cursor: pointer;
//   color: white;
//   background: black;
// `;

const RowDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  border-right: 1px solid black;
`;

const OuterContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
  height: 100%;
  width: 100%;
  z-index: 1;
  text-transform: uppercase;
  border-right: 1px solid black;
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
  width: 100%;
  min-height: 400px;
  position: fixed;
  border-right: 1px solid black;
`;

export default PurchaseModal;
