import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import {PurchaseContext} from  '../../purchaseContext';
import { CartContext } from "../../cartContext";

const PurchaseNavBar = () => {
  const { purchaseModalVisible, setPurchaseModalVisible } = React.useContext(PurchaseContext);
  const { setCartVisible, setClickStatus } = React.useContext(CartContext);
  const cartStatus = useSelector((state) => state.orders.status);

  const closePurchase = () => {
    setCartVisible(false);
    setClickStatus(false);
    setPurchaseModalVisible(0);
  };
  const handleClickPrev = () => {
    setPurchaseModalVisible(purchaseModalVisible - 1);
  };
  // was for testing purposes:
  // const handleClickNext = () => {
  //   if (purchaseModalVisible !== 3) {
  //     setPurchaseModalVisible(purchaseModalVisible+1);
  //   }
  // };

  return (
    <Bar>
      <div>{/* literally a place holder */}</div>
      <ColumnDiv>
        <RowDiv>
          Step {purchaseModalVisible} of 4
        </RowDiv>
        <RowDiv>
          {purchaseModalVisible !== 4 &&
            <NextPrevButtons
            onClick = {handleClickPrev}
            >
              ←
            </NextPrevButtons>
          }
          {/* <NextPrevButtons
          onClick = {handleClickNext}
          >
            →
          </NextPrevButtons> */}
        </RowDiv>
      </ColumnDiv>
      <EscapeButton disabled={cartStatus !== "idle"} onClick={closePurchase}>
        EXIT
      </EscapeButton>
    </Bar>
  );
};

export default PurchaseNavBar;
const EscapeButton = styled.div`
  text-align: center;
  /* position: relative; */
  /* right: 0; */
  /* top: 0; */
  cursor: pointer;
  padding: 5px;
  background-color: black;
  color: white;
`;
const NextPrevButtons = styled.button`
  text-align: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: white;
  background: black;
  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }
`;
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* width: 100px; */
  /* text-align: center; */
  align-items: center;
  text-align: justify;
`;
const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const Bar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  text-align: center;
  background: lightgray;
  padding: 20px;
`;
