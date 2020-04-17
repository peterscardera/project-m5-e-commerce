import React, { useContext } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { CartContext } from "../../cartContext";
import { PurchaseContext } from "../../purchaseContext";
import CartItems from "./CartItems";

import {
  requestEmptyCart,
  emptyCartSuccess,
  emptyCartError,
} from "../../actions";

const Cart = () => {
  const { setCartVisible, setClickStatus, clickStatus, cartVisible  } = useContext(CartContext);
  const {
    purchaseModalVisible,
    setPurchaseModalVisible,
    itemsQuantityInCart,
    setItemsQuantityInCart,
    subTotalInCart,
    setSubTotalInCart,
  } = useContext(PurchaseContext);
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
    setItemsQuantityInCart(totalNumItems);
    sumPrice = parseInt(100 * sumPrice) / 100;
    sumPrice = sumPrice.toString();
    if (sumPrice.charAt(sumPrice.length - 2) === ".") {
      sumPrice = `${sumPrice}0`;
    } else if (sumPrice.charAt(sumPrice.length - 3) != ".") {
      sumPrice = `${sumPrice}.00`;
    }
  }
  setSubTotalInCart(sumPrice);

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
    setClickStatus(false);
    setCartVisible(false);
    setPurchaseModalVisible(1);
  };

  let totalText = "";

  if (subTotalInCart > 0 && itemsQuantityInCart === 1) {
    totalText = `Your cart contains ${itemsQuantityInCart} item.  SubTotal : $${subTotalInCart}`;
  } else if (subTotalInCart > 0 && itemsQuantityInCart > 1) {
    totalText = `Your cart contains ${itemsQuantityInCart} items.  SubTotal : $${subTotalInCart}`;
  } else {
    totalText = "Your cart is empty.";
  }
  return (
    <React.Fragment>
      <Container clickStatus={clickStatus} hoverStatus={cartVisible}>
        {Object.keys(currentCart).length > 0 &&
          Object.keys(currentCart).map((itemId, index) => {
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
        {
          purchaseModalVisible === 0 ? (
            <>
              <Totals>{totalText}</Totals>
              <FinalLineOptions>
                {Object.keys(currentCart).length > 0 && (
                  <>
                    <StyledButton onClick={handlePurchase}>
                      {" "}
                      CHECKOUT
                    </StyledButton>
                    <StyledButton onClick={handleEmpty}>
                      EMPTY CART
                    </StyledButton>
                  </>
                )}
              </FinalLineOptions>
            </>
          ) : null

          // <PurchaseButtons/>
        }
      </Container>
    </React.Fragment>
  );
};

const StyledButton = styled.button`
  cursor: pointer;
`;
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
  height: fill;
  /* change to flexible width */
  width: 400px;
  border: ${(props) =>
    props.clickStatus ? "1px solid black" : "1px solid black"};
  padding: 25px;
  /* margin-left: auto; */
  z-index: 5;
  position: absolute;
  right: 0;
  background-color: ${(props) =>
    !props.clickStatus && !props.cartVisible
      ? "rgb(255,255,255)"
      : "rgb(255,255,255)"};
`;

export default Cart;
