import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//****Reminder: VendorPage is a child component of the ItemsDetails page**
const VendorPage = ({ name, itsWebSite, itsCountry, itsId }) => {
  return (
    <>
      <StyledAnchor href={itsWebSite} rel="noreferrer" target="_blank">
        <div>Product by: {name}</div>
      </StyledAnchor>
    </>
  );
};

const StyledAnchor = styled.a`
  text-decoration: none;
  color: white;
  div {
    padding-left: 25px;
    padding-top: 10px;
    font-style: italic;
    background-color: black;
  }
  &:hover {
    text-decoration: underline;
  }
`;

export default VendorPage;
