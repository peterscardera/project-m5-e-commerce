import React from "react";
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

const Cart = () => {
  const { clickStatus, cartVisibilityPreHover } = React.useContext(CartContext);
  const { purchaseModalVisible, setPurchaseModalVisible } = React.useContext(
    PurchaseContext
  );
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
  }
  console.log("dnjinijwjmdkoqmwkodmnjweindioqwejkmdijnewi", totalNumItems);

  console.log("dnjinijwjmdkoqmwkodmnjweindioqwejkmdijnewi", sumPrice);

  // React.useEffect(()=>{
  //   let keys = Object.keys(grandTotalObject);
  //   if (keys.length === 0) {
  //     setGrandTotal(0);
  //   }
  //   else {
  //   let sum = 0;
  //   keys.forEach((key)=>{
  //     sum += grandTotalObject[key];
  //   })
  //   sum = parseInt(100*sum)/100;
  //   sum = sum.toString();
  //   if (sum.charAt(sum.length-2) === "."){
  //     sum = `${sum}0`;
  //   }
  //   else if (sum.charAt(sum.length-3) != "."){
  //     sum = `${sum}.00`;
  //   }
  //   setGrandTotal(sum);
  //   }
  // },[grandTotalObject]);

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
    setPurchaseModalVisible(true);
  };

  let totalText = "";

  if (sumPrice > 0 && totalNumItems === 1) {
    totalText = `Your cart contains ${totalNumItems} item.  Total : ${sumPrice}`;
  } else if (sumPrice > 0 && totalNumItems > 1) {
    totalText = `Your cart contains ${totalNumItems} items.  Total : ${sumPrice}`;
  } else {
    totalText = "Your cart is empty.";
  }

  return (
    <React.Fragment>
      <Container clickStatus={clickStatus} hoverStatus={cartVisibilityPreHover}>
      {Object.keys(currentCart).length > 0 && Object.keys(currentCart).map((itemId, index) => {
          return (
            <>
              <CartItems
                key={itemId}
                itemForDispatch={currentCart[itemId].itemInfo[0]}
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
              <button onClick={handlePurchase}> CHECKOUT</button>
              <button onClick={handleEmpty}>EMPTY CART</button>
            </>
          )}
        </FinalLineOptions>
      </Container>
    </React.Fragment>
  );
};

export default Cart;

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
  right: 0px;
  background-color: ${(props) =>
    !props.clickStatus && !props.cartVisibilityPreHover
      ? "rgba(0,255,0,0.5)"
      : "rgba(0,255,0,1)"};
`;
