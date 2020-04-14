import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

import { 
  resetErrorStatus,
  requestAddItemToCart, 
  addItemToCartSuccess, 
  addItemToCartError, 
  requestDiscardItem,
  discardItemSuccess,
  discardItemError,
  requestRemoveItem,
  removeItemFromCartSuccess,
  removeItemFromCartError
} from "../../actions";
import styled from "styled-components";



const CartItems = ({ itemForDispatch, item, quantity }) => {
  const [subTotal, setSubTotal] = useState(quantity*parseFloat(item.price.substring(1)))
  const [stateQuantity, setStateQuantity] = useState(quantity);
  React.useEffect(()=>{
    setSubTotal(Math.floor(100*stateQuantity*parseFloat(item.price.substring(1)))/100);
  },[stateQuantity]);
  
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  let linkAddress = `/item/${item.id}`;

  const handleAdd = (ev) => {
      ev.preventDefault();
      ev.target.style.disabled = true;
      dispatch(requestAddItemToCart());
      if (!user) {
        dispatch(addItemToCartSuccess(itemForDispatch, "1"));
        setStateQuantity(stateQuantity+1)
      }
      else {
        fetch(`/addItem/${user.email}/${item.id}/1`, {
          method: "GET",
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(addItemToCartSuccess(itemForDispatch, "1"));
            setStateQuantity(stateQuantity+1)
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
      }
      ev.target.style.disabled = false;
  };

  const handleSubtract = (ev) => {  
    ev.preventDefault();
      ev.target.style.disabled = true;
      dispatch(requestDiscardItem());
      if (!user) {
        dispatch(discardItemSuccess(itemForDispatch, "1"));
        setStateQuantity(stateQuantity-1)
      }
      else {

        fetch(`/removeItem/${user.email}/${item.id}/1`, {
          method: "GET",
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(discardItemSuccess(itemForDispatch, "1"));
            setStateQuantity(stateQuantity-1)
          } 
          else if (res.status === 400) {
            dispatch(discardItemError());
            // An error has occured
          } 
          else {
            dispatch(discardItemError());
            console.log("something went wrong but it shouldnt have ");
          }
        })
      }
      ev.target.style.disabled = false;
  }

  // console.log('quant type',typeof (quantity));
  // console.log('item.price type',parseFloat(item.price.substring(1)));
  console.log('numinstock',item.numInStock)
  console.log('quant type', quantity);
  return (
    <React.Fragment>
      <Wrapper>
        <div>
          <NavLink to={linkAddress}>
            <StyledImg src={item.imageSrc} />
          </NavLink>
        </div>
        <div>
          <div> {item.name} </div>
          
        <QuantPriceWrapper>
          In Cart:
          <PlusMinusNumberWrapper> 
            <StyledButton
            disabled = {item.numInStock === stateQuantity}
            onClick = {(ev) => {handleAdd(ev)}}
            disabledStatus = {item.numInStock === stateQuantity}
            >+</StyledButton>
            <div>{stateQuantity}</div>
            <StyledButton
            disabled = {stateQuantity <= 0}
            onClick = {(ev) => {handleSubtract(ev)}}
            >-</StyledButton>
          </PlusMinusNumberWrapper>
          <div>
            X
          </div>
          {item.price} 
          <div>
            =
          </div>
        <div> ${subTotal} </div>
        </QuantPriceWrapper>
        {/* <Quantity
          type="text"
          placeholder="#"
          // onChange={(e) => dispatch(updateItem(e.target.value, id))}
          // value={quantity} take it from props from parent
        ></Quantity> */}
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default CartItems;

const StyledButton = styled.button`
  cursor: ${props => props.disabledStatus ? "not-allowed" : "pointer"};
`
const QuantPriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  align-items: center;
  
`
const PlusMinusNumberWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  
`;

const StyledImg = styled.img`
  height: 100px;
  width: 100px;
  grid-column: 1 / 2;
`;

const Quantity = styled.input`
  background: grey;
  padding: 10px;
  width: 20px; 
  height: 20px;
`;