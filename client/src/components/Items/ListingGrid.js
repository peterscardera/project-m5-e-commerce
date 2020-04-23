import React from "react";
import styled from "styled-components"
import EachUnit from "./EachUnit";

const ListingGrid = ({ itemList }) => {
  return (
    <React.Fragment>
      <Wrapper>
        {itemList.map((eachItem) => {
          return <EachUnit key={eachItem._id} {...eachItem} />;
        })}
      </Wrapper>
    </React.Fragment>
  );
};

export default ListingGrid;

const Wrapper = styled.div`
  /* height:300px; */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-gap: 24px;
`;
