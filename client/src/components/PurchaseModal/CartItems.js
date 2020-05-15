import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ip } from "../../constantsB";
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
  removeItemFromCartError,
} from "../../actions";
import styled from "styled-components";

const CartItems = ({ item, quantity }) => {
  const [subTotal, setSubTotal] = useState(
    quantity * parseFloat(item.price.substring(1))
  );
  const stateItem = useSelector((state) => state.orders.currentCart[item._id]);
  let stateQuantity = 0;
  if (stateItem) stateQuantity = stateItem.quantity;
  else if (stateQuantity != 0) stateQuantity = 0; //this line may be wrong
  React.useEffect(() => {
    let newSubTotal =
      Math.floor(100 * stateQuantity * parseFloat(item.price.substring(1))) /
      100;
    setSubTotal(newSubTotal);
  }, [stateQuantity]);

  const user = useSelector((state) => state.user.user);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  let linkAddress = `/item/${item._id}`;

  const handleAdd = (ev) => {
    ev.preventDefault();
    ev.target.style.disabled = true;
    dispatch(requestAddItemToCart());
    if (!user) {
      dispatch(addItemToCartSuccess([item], 1));
    } else {
      fetch(`${ip}/mongo/addItem/${user.email}/${item._id}/1`, {
        method: "GET",
      }).then((res) => {
        if (res.status === 200) {
          dispatch(addItemToCartSuccess([item], 1));
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
    ev.target.style.disabled = false;
  };

  const handleSubtract = (ev, x) => {
    ev.preventDefault();
    ev.target.style.disabled = true;
    dispatch(requestRemoveItem());
    if (!user) {
      dispatch(removeItemFromCartSuccess([item], x));
    } else {
      fetch(`${ip}/mongo/removeItem/${user.email}/${item._id}/${x}`, {
        method: "PUT",
      }).then((res) => {
        if (res.status === 200) {
          dispatch(removeItemFromCartSuccess([item], x));
        } else if (res.status === 400) {
          dispatch(removeItemFromCartError());
          // An error has occured
        } else {
          dispatch(removeItemFromCartError());
          console.log("something went wrong but it shouldnt have ");
        }
      });
    }
    ev.target.style.disabled = false;
  };

  const handleDelete = (ev) => {
    handleSubtract(ev, stateQuantity);

  };

  return (
    <React.Fragment>
      <Wrapper>
        <DeleteButton
          onClick={(ev) => {
            handleDelete(ev, 1);
          }}
        >
          X
        </DeleteButton>
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
                disabled={item.numInStock === stateQuantity}
                onClick={(ev) => {
                  handleAdd(ev);
                }}
                disabledStatus={item.numInStock === stateQuantity}
              >
                +
              </StyledButton>
              <div>{stateQuantity}</div>
              <StyledButton
                disabled={stateQuantity <= 0}
                onClick={(ev) => {
                  handleSubtract(ev, 1);
                }}
              >
                -
              </StyledButton>
            </PlusMinusNumberWrapper>
            <div>x</div>
            {item.price}
            <div>=</div>
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

const DeleteButton = styled.div`
  text-align: center;
  position: absolute;
  cursor: pointer;
  font-size: 20px;
  margin-top: 7px;
  background: white;
  border-radius: 50%;
  height: 28px;
  width: 28px;
`;

const StyledButton = styled.button`
  cursor: ${(props) => (props.disabledStatus ? "not-allowed" : "pointer")};
`;
const QuantPriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  align-items: center;
`;
const PlusMinusNumberWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledImg = styled.img`
  height: 100px;
  width: 100px;
  margin-right: 10px;
`;

const Quantity = styled.input`
  background: grey;
  padding: 10px;
  width: 20px;
  height: 20px;
`;
