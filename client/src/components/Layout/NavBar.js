import React from "react";
import styled from "styled-components";

const NavBar = () => {
  return (
    <>
      <header>
        <NavWrapper>
          <a href="#"> HOME </a>
          <a href="#">SHOP</a>
          <a href="#">ACCOUNT</a>
          <a href="#">CART</a>
        </NavWrapper>
      </header>
    </>
  );
};

// once you click on account, we can have our sign in / create account, and even a wishlist! //

const NavWrapper = styled.nav`
  background: lightgrey;
  font-family: sans-serif;
  margin-top: 10px;
  padding-top: 10px;
  font-size: 20px;
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default NavBar;
