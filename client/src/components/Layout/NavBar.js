import React from "react";
import styled from "styled-components";
import { Redirect, Link, NavLink } from "react-router-dom";

import {CartContext} from  '../../cartContext';


const NavBar = () => {
  const {cartVisible, setCartVisible} = React.useContext(CartContext);
  const {clickStatus, setClickStatus} = React.useContext(CartContext);
  const [cartVisibilityPreHover, setCartVisibilityPreHover] = React.useState(cartVisible);
  return (
    <>
      <header>
        <NavWrapper>
          <NavLink to="/">
            HOME 
          </NavLink>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          <NavLink to="/account">
            ACCOUNT
          </NavLink>
          <CartButton 
          onMouseEnter={()=>{
            setCartVisibilityPreHover(cartVisible)
            setCartVisible(true)
          }}
          onMouseLeave={()=>{
            if (cartVisibilityPreHover && clickStatus) setCartVisible(true);
            else if (cartVisibilityPreHover && !clickStatus) setCartVisible(false);
            else if (!cartVisibilityPreHover && clickStatus) setCartVisible(true);
            else if (!cartVisibilityPreHover && !clickStatus) setCartVisible(false);
          }} 
          onClick={()=>{
            setClickStatus(!clickStatus);
          }
          }>
            CART
          </CartButton>
        </NavWrapper>
      </header>
    </>
  );
};

// once you click on account, we can have our sign in / create account, and even a wishlist! //
// hover menu over "shop" - shop all, shop categories

const NavWrapper = styled.nav`
  background: lightgrey;
  margin-top: 10px;
  padding-top: 10px;
  font-size: 20px;
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  a {
    padding: 5px;
    color: black;
    text-decoration: none;
    @media screen and (max-width: 420px) {
      flex: 100%;
      font-size: 16px;
    }
  }
  a:hover {
    color: white;
  }
`;
const CartButton = styled.button`
  &:hover {
    cursor: pointer;
  }
`

export default NavBar;
