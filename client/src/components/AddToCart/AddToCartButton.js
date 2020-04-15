import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCartSuccess,requestAddItemToCart, addItemToCartError} from "../../actions";

//**reminder: Button is a child component in ItemDetails */

const AddToCartButton = ({ productChosen }) => {
  const loggedInStatus = useSelector((state) => state.user.user);
  const orderInfo = useSelector((state) => state.orders.currentCart);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const addToCardHandler = () => {
    // console.log(productChosen);
    //see if user is logged in
    if (loggedInStatus === null) {
      dispatch(addItemToCartSuccess(productChosen, quantity));
    } else {
      dispatch(requestAddItemToCart());
      fetch(`/addItem/${loggedInStatus.email}/${productChosen[0].id}/${quantity}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch(addItemToCartSuccess(productChosen, quantity));
        } 
        else if (res.status === 400) {
          dispatch(addItemToCartError());
          // An error has occured
        } 
        else if (res.status === 409) {
          dispatch(addItemToCartError());
          // Insufficient quantity available
        } 
        else {
          dispatch(addItemToCartError());
          console.log("something went wrong but it shouldnt have ");
        }
      })

    // fetch/addItem/:email/${productChosen[0].id}/${quantity}`)
      // to add to cart with a user being sign in we would fetch the /addItem/:email/:itemId/:quantity
    }

    // console.log(orderInfo, "ORDER");
  };

  const handleInputChange = (keypress) => {
    if (typeof parseInt(keypress.value) != "number") {
      setQuantity(0);
    } else {
      setQuantity(parseInt(keypress.value));
    }


    // let currentQuantity = 0;

    // if (orderInfo[productChosen[0].id]) {

    //   currentQuantity = parseInt(orderInfo[productChosen[0].id].quantity);
    // }

    // if (
    //   parseInt(keypress.value) + currentQuantity <=
    //   productChosen[0].numInStock
    // ) {

    //  }
  };

  return (
    <React.Fragment>
      {productChosen[0].numInStock !== 0 ? (
        <>
          <button onClick={addToCardHandler}>Add to Cart</button>
          <input
            type="number"
            min="0"
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
