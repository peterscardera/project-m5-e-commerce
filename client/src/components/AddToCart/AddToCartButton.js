import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCartSuccess,
  requestAddItemToCart,
  addItemToCartError,
} from "../../actions";

//**reminder: Button is a child component in ItemDetails */

const AddToCartButton = ({ productChosen }) => {
  const loggedInStatus = useSelector((state) => state.user.user);
  const orderInfo = useSelector((state) => state.orders.currentCart);
  const inventory = useSelector((state)=> state.gallery.items)
  const [quantity, setQuantity] = useState(1);
  // console.log(loggedInStatus);
  console.log(quantity, "*******");

  const dispatch = useDispatch();

  const addToCardHandler = () => {
    // console.log(productChosen);
    //see if user is logged in
    if (loggedInStatus === null) {
      dispatch(addItemToCartSuccess(productChosen, quantity));
    } else {
      dispatch(requestAddItemToCart());
      fetch(
        `/addItem/${loggedInStatus.email}/${productChosen[0].id}/${quantity}`
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

  console.log(orderInfo, "ORDER INFO");
  let orderKeys = Object.keys(orderInfo);
  let foundQuantity = 0;

  orderKeys.forEach((eachKey) => {
    let tempFound = undefined;
    if (orderInfo[eachKey]) {
      tempFound = orderInfo[eachKey].itemInfo.id;
    }
    if (tempFound) {
      foundQuantity = orderInfo[eachKey].quantity;
    }
    console.log(tempFound);
  });


   const numInStock = productChosen[0].numInStock

   const  maxNumVar = parseInt(numInStock) - parseInt(foundQuantity);


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
          <button onClick={addToCardHandler}>Add to Cart</button>
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
