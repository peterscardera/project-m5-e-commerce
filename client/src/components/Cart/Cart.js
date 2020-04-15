import React, { useContext } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { CartContext } from "../../cartContext";
import { PurchaseContext } from "../../purchaseContext";
import CartItems from "./CartItems";

import {
  resetErrorStatus,
  requestEmptyCart,
  emptyCartSuccess,
  emptyCartError,
} from "../../actions";

const Cart = ( right ) => {
  const { setCartVisible } = useContext(CartContext);
  const { clickStatus, cartVisibilityPreHover } = useContext(CartContext);
  const { purchaseModalVisible, setPurchaseModalVisible } = useContext(PurchaseContext);
  const dispatch = useDispatch();
  const currentCart = useSelector((state) => state.orders.currentCart);
  const user = useSelector((state) => state.user.user);

  let sumPrice = 0;
  let totalNumItems = 0;
  const cartKeys = Object.keys(currentCart);
  if (cartKeys.length === 0) {
    sumPrice = 0;
    totalNumItems = 0;
  } else {
    cartKeys.forEach((id) => {
      totalNumItems += currentCart[id].quantity;

      // const [subTotal, setSubTotal] = useState(quantity*parseFloat(item.price.substring(1)))
      // console.log(currentCart[id]);
      let price = currentCart[id].itemInfo.price;
      if (price) {
        price = price.substring(1);
        price = parseFloat(price);
        sumPrice += currentCart[id].quantity * price;
      }
    });
    sumPrice = parseInt(100*sumPrice)/100;
    sumPrice = sumPrice.toString();
    if (sumPrice.charAt(sumPrice.length-2) === "."){
      sumPrice = `${sumPrice}0`;
    }
    else if (sumPrice.charAt(sumPrice.length-3) != "."){
      sumPrice = `${sumPrice}.00`;
    }
  }
  
  const handleEmpty = () => {
    dispatch(requestEmptyCart());
    if (!user) {
      dispatch(emptyCartSuccess());
    } else {
      fetch(`/emptyCart/${user.email}`, {
        method: "PUT",
      }).then((res) => {
        if (res.status === 200) {
          dispatch(emptyCartSuccess());
        } else if (res.status === 400) {
          dispatch(emptyCartError());
          // No account it attached to the email address
        } else {
          dispatch(emptyCartError());
          console.log("something went wrong but it shouldnt have ");
        }
      });
    }
  };

  const handlePurchase = () => {
    console.log("setting modal open");
    setCartVisible(false);
    setPurchaseModalVisible(true);
  };

  let totalText = "";

  if (sumPrice > 0 && totalNumItems === 1) {
    totalText = `Your cart contains ${totalNumItems} item.  SubTotal : $${sumPrice}`;
  } else if (sumPrice > 0 && totalNumItems > 1) {
    totalText = `Your cart contains ${totalNumItems} items.  SubTotal : $${sumPrice}`;
  } else {
    totalText = "Your cart is empty.";
  }

  return (
    <React.Fragment>
      <Container right = {right.right} clickStatus={clickStatus} hoverStatus={cartVisibilityPreHover}>
      {Object.keys(currentCart).length > 0 && Object.keys(currentCart).map((itemId, index) => {
          return (
            <>
              <CartItems
                key={itemId}
                item={currentCart[itemId].itemInfo}
                quantity={currentCart[itemId].quantity}
              ></CartItems>
            </>
          );
        })}
        <Totals>{totalText}</Totals>
        <FinalLineOptions>
          {Object.keys(currentCart).length > 0 && (
            <>
              <StyledButton onClick={handlePurchase}> CHECKOUT</StyledButton>
              <StyledButton onClick={handleEmpty}>EMPTY CART</StyledButton>
            </>
          )}
        </FinalLineOptions>
      </Container>
    </React.Fragment>
  );
};

export default Cart;

const StyledButton = styled.button`
  cursor: pointer;
`

const Totals = styled.div`
  text-align: right;
`;
const FinalLineOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 48.75%;
`;
const Container = styled.div`
  opacity: "0.5";
  height: fill;
  /* change to flexible width */
  width: 400px;
  border: ${(props) =>
    props.clickStatus ? "1px solid green" : "1px solid black"};
  padding: 10px;
  /* margin-left: auto; */
  z-index: 5;
  position: absolute;
  right: ${props => props.right};
  background-color: ${(props) =>
    !props.clickStatus && !props.cartVisibilityPreHover
      ? "rgba(0,255,0,0.5)"
      : "rgba(0,255,0,1)"};
`;
