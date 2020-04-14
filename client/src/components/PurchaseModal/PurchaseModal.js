import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import {PurchaseContext} from  '../../purchaseContext';

// import { 
//   resetErrorStatus,
//   requestEmptyCart,
//   emptyCartSuccess,
//   emptyCartError
// } from "../../actions";

const PurchaseModal = () => {
  const { purchaseModalVisible, setPurchaseModalVisible } = React.useContext(PurchaseContext);
  const currentCart = useSelector((state) => state.orders.currentCart);
  const cartstate = useSelector((state) => state.orders.state);
  
  const closePurchase = () => {
    //add disabled if state is not idle
    console.log('close working?');
    setPurchaseModalVisible(false);
  }
  // console.log('currentCart: ', Object.keys(currentCart).length);

  return (
    <React.Fragment>
      <OuterContainer>
        <InnerContainer>
          Purchase Modal
          <StyledButton
          disabled = {cartstate !== 'idle'}
          onClick = {closePurchase}
          >
            X
          </StyledButton>
        </InnerContainer>
      </OuterContainer>
    </React.Fragment>
  );
};

export default PurchaseModal;


// background-color: ${props => (!props.clickStatus && !props.cartVisibilityPreHover) ? "rgba(0,255,0,0.5)" : "rgba(0,255,0,1)"};

const StyledButton = styled.button`
  cursor: pointer;
`
const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
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
  /* position: absolute; */
`;

const OuterContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
  height: 100vh;
  width: 100vw;
  z-index: 10;
`
