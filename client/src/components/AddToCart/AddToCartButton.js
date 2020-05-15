import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ip } from "../../constantsB";

import {
  addItemToCartSuccess,
  requestAddItemToCart,
  addItemToCartError,
} from "../../actions";

//**reminder: Button is a child component in ItemDetails */

const AddToCartButton = ({ productChosen, currentCart }) => {

  const { itemId } = useParams();

  const loggedInStatus = useSelector((state) => state.user.user);
  const orderInfo = useSelector((state) => state.orders.currentCart);
  const [quantity, setQuantity] = useState(1);
  const [foundQuantity, setFoundQuantity] = useState(0);
  
  const dispatch = useDispatch();
  
  const addToCardHandler = () => {
    // console.log(productChosen);
    //see if user is logged in
    if (loggedInStatus === null) {
      dispatch(addItemToCartSuccess(productChosen, quantity));
    } else {
      dispatch(requestAddItemToCart());
      fetch(
        `${ip}/mongo/addItem/${loggedInStatus.email}/${productChosen[0]._id}/${quantity}`
        ).then((res) => {
          if (res.status === 200) {
            dispatch(addItemToCartSuccess(productChosen, quantity));
          } else if (res.status === 400) {
            dispatch(addItemToCartError());
            // An error has occured
          } else if (res.status === 409) {
            dispatch(addItemToCartError());
            // Insufficient quantity available
          } else {
            dispatch(addItemToCartError());
            console.log("something went wrong but it shouldnt have ");
          }
        });
      }
    };
    useEffect(() => {
      if (orderInfo[itemId]){
        setFoundQuantity(orderInfo[itemId].quantity)
      }
    },[currentCart, orderInfo, itemId]);

    // useEffect(() => {
    //   let orderKeys = Object.keys(orderInfo);
    //   orderKeys.forEach((eachKey) => {
    //     if (orderInfo[itemId]) {
    //       setTempFound(orderInfo[eachKey].itemInfo._id)
    //       // console.log(tempFound)
    //     }
    //     if (tempFound) {
    //       setFoundQuantity(orderInfo[eachKey].quantity);
    //     }
    //   });
    // },[itemId]);
    
  const numInStock = productChosen[0].numInStock;

  const maxNumVar = parseInt(numInStock) - parseInt(foundQuantity);

  const handleInputChange = (keypress) => {
    if (typeof parseInt(keypress.value) != "number") {
      setQuantity(0);
    } else {
      setQuantity(parseInt(keypress.value));
    }
    let quantityInCart = 0;
  };
  
  return (
    <React.Fragment>
      {productChosen[0].numInStock !== 0 ? (
        <>
          <AddToCButton
            disabled={numInStock < quantity + foundQuantity}
            onClick={addToCardHandler}
          >
            {numInStock < quantity + foundQuantity
              ? "Request exceeds inventory"
              : "Add to Cart"}
          </AddToCButton>
          <input
            type="number"
            min="0"
            max={maxNumVar}
            // placeholder={typeof quantity === "number" ? quantity : "0"}
            onChange={(e) => {
              handleInputChange(e.target);
            }}
            value={typeof quantity === "number" ? quantity : "0"}
          ></input>
        </>
      ) : (
        <div> SOLD OUT!</div>
      )}
    </React.Fragment>
  );
};
export default AddToCartButton;

//we want the add to cart button to not only be disable but to also let the user know he has has hold the max amt in his cart
const AddToCButton = styled.button`
  opacity: ${(props) => (props.disabled ? ".5" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  &:hover {
    background: grey;
  }
`;
