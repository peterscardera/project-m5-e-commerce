import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//**Reminder EachUnit is a child component of listing Grid */
const EachUnit = ({
  name,
  price,
  body_location,
  category,
  _id,
  imageSrc,
  numInStock,
  companyId,
}) => {
  return (
    <React.Fragment>
      <Container>
        <ImgCenter>
          <StyledLink to={`/item/${_id}`}>
            <StyledImg src={imageSrc} />
          </StyledLink>
        </ImgCenter>
        <SpaceBetween>
          <StyledLink to={`/item/${_id}`}>
            <div>{name}</div>
          </StyledLink>
          <StyledPrice>{price}</StyledPrice>
          <StyledNum> {numInStock > 0 ? "Available" : "Sold out"}</StyledNum>
        </SpaceBetween>
      </Container>
    </React.Fragment>
  );
};

export default EachUnit;

const Container = styled.div`
  /* background: lightgray; */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* height: 300px;  */
`;

const ImgCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledImg = styled.img`
  margin-bottom: 1rem;
`;

const SpaceBetween = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const StyledPrice = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;

const StyledNum = styled.div``;
