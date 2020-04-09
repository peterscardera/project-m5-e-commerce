import React from "react";
import styled from "styled-components";

const NavBar = () => {
  return (
    <>
      <header>
        <NavWrapper>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
            <li>
              <a href="#">Wishlist</a>
            </li>
            <li>
              <a href="#">Shopping Cart</a>
            </li>
          </ul>
        </NavWrapper>
      </header>
    </>
  );
};

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  background: lightseagreen;
  font-family: sans-serif;
  font-size: 30px;
  margin: 0;
`;

export default NavBar;
