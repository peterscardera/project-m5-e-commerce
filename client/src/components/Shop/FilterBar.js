import React from "react";
import styled from "styled-components";

const FilterBar = ({ setItemsPerPage }) => {
  const submitHandler = (e) => {
    // console.log(e.target.value);
    setItemsPerPage(e.target.value);
  };

  return (
    <Container>
      <label htmlFor="viewAmount">View: </label>
      <select onChange={submitHandler} id="viewAmount">
        <option value="4">4</option>
        <option value="6">6</option>
        <option selected value="8">
          8
        </option>
      </select>
    </Container>
  );
};

export default FilterBar;

const Container = styled.div`
  background: lightblue;
  height: 50px;
`;
