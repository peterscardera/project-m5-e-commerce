import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import {CartContext} from  '../../cartContext';
import CartItems from "./CartItems";

const Cart = () => {
  const { clickStatus } = React.useContext(CartContext);
  const { cartVisibilityPreHover } = React.useContext(CartContext);
  const currentCart = useSelector((state) => state.orders.currentCart);
  
  // console.log('currentCart: ', currentCart);

  return (
    <React.Fragment>
      <Container 
      clickStatus = {clickStatus}
      hoverStatus = {cartVisibilityPreHover}
      >
        {Object.keys(currentCart).map((itemId, index) => {
          console.log('item info?',currentCart[itemId].itemInfo);
          return (
            <>
              <CartItems
                key = {itemId}
                item = {currentCart[itemId].itemInfo[0]}
              ></CartItems>
            </>
          );
        })}
        {currentCart.length > 3 && <div> ".." more product</div>}
        <button> See shopping cart</button>
      </Container>
    </React.Fragment>
  );
};

export default Cart;

const Container = styled.div`
  opacity: '0.5';
  height: 600px;
  /* change to flexible width */
  width: 400px;
  border: ${props => props.clickStatus ? "1px solid green" : "1px solid black"};
  margin-left: auto;
  z-index: 5;
  position: absolute;
  right: 0px;
  background-color: ${props => (!props.clickStatus && !props.cartVisibilityPreHover) ? "rgba(0,255,0,0.5)" : "rgba(0,255,0,1)"};
`;
