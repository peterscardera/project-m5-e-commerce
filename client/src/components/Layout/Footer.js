import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <FootWrapper>
        <ul>
          <li>About Us</li>
          <li>Privacy Policy</li>
          <li>Legal Notes</li>
          <li>Copyright</li>
        </ul>
      </FootWrapper>
    </>
  );
};

const FootWrapper = styled.footer`
  background: black;
  color: white;
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    text-align: center;
  }
  li {
    padding: 20px;
    flex: 1;
  }
`;

export default Footer;
