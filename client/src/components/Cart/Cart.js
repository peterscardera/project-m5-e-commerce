import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import {CartContext} from  '../../cartContext';
import {PurchaseContext} from  '../../purchaseContext';
import CartItems from "./CartItems";

import { 
  resetErrorStatus,
  requestEmptyCart,
  emptyCartSuccess,
  emptyCartError
} from "../../actions";

const Cart = () => {
  const [grandTotalObject, setGrandTotalObject] = React.useState({});
  const [grandTotal, setGrandTotal] = React.useState(0);
  const { clickStatus, cartVisibilityPreHover } = React.useContext(CartContext);
  const { purchaseModalVisible, setPurchaseModalVisible } = React.useContext(PurchaseContext);
  const currentCart = useSelector((state) => state.orders.currentCart);
  
  const handleEmpty = () => {

  };
  // console.log('currentCart: ', Object.keys(currentCart).length);

  const handlePurchase = () => {
    console.log('setting modal open');
    setPurchaseModalVisible(true);
  }

  return (
    <React.Fragment>
      <Container 
      clickStatus = {clickStatus}
      hoverStatus = {cartVisibilityPreHover}
      >
        {console.log('The cart AS IT WERE   JIJIJIJIJI', currentCart)}
        {Object.keys(currentCart).map((itemId, index) => {
          // console.log('item info?',currentCart[itemId].itemInfo);
          console.log('item info?',currentCart[itemId].itemInfo);
          return (
            <>
              <CartItems
                key = {itemId}
                itemForDispatch = {currentCart[itemId].itemInfo[0]}
                item = {currentCart[itemId].itemInfo}
                quantity = {currentCart[itemId].quantity}
                grandTotalObject = {grandTotalObject}
                setGrandTotalObject = {setGrandTotalObject}
              ></CartItems>
            </>
          );
        })}
        <FinalLineOptions>
          { Object.keys(currentCart).length > 0 ? (
            <>
            <button
            onClick = {handlePurchase}
            > CHECKOUT</button>
            <button
            onClick = {handleEmpty}
            >EMPTY CART</button>
            </>
          ) : (
            "Your cart is empty"
          )}

        </FinalLineOptions>
      </Container>
    </React.Fragment>
  );
};

export default Cart;

const FinalLineOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 48.75%;
`
const Container = styled.div`
  opacity: '0.5';
  height: fill;
  /* change to flexible width */
  width: 400px;
  border: ${props => props.clickStatus ? "1px solid green" : "1px solid black"};
  padding: 10px;
  /* margin-left: auto; */
  z-index: 5;
  position: absolute;
  right: 0px;
  background-color: ${props => (!props.clickStatus && !props.cartVisibilityPreHover) ? "rgba(0,255,0,0.5)" : "rgba(0,255,0,1)"};
`;
