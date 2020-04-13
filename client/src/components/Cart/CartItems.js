import React from "react";
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

const CartItems = ({ item }) => {
  let linkAddress = `/item/${item.id}`;
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
          <div> {item.price} </div>
        <Quantity
          type="text"
          placeholder="#"
          // onChange={(e) => dispatch(updateItem(e.target.value, id))}
          // value={quantity} take it from props from parent
        ></Quantity>
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default CartItems;

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