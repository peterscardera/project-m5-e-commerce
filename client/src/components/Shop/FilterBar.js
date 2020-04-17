import React, { useState } from "react";
import styled from "styled-components";

//*Reminder: Filter is child component of shop.js
const FilterBar = ({ allOfTheItems, setItemsPerPage }) => {
  const submitHandler = (e) => {
    // console.log(e.target.value);
    setItemsPerPage(e.target.value);
  };

  const [searchState, setSearchState] = useState("");

  let matchedItems = allOfTheItems.filter((item) => {
    if (
      searchState.length >= 2 &&
      item.name.slice(0, 7).toLowerCase().includes(searchState.toLowerCase())
    ) {
      return item;
    }
    return null;
  });

  //remove the slice and

  console.log(matchedItems); //for now this return doesnt prop up back up to parent component

  return (
    <Container>
      <label htmlFor="viewAmount">View: </label>
      <select onChange={submitHandler} id="viewAmount">
        <option value="4">4</option>
        <option value="6">6</option>
        <option selected value="8">
          8
        </option>
        <option value="16">16</option>
      </select>

      <label htmlFor="search"></label>
      <StyledInput
        autocomplete="off"
        placeholder="search"
        id="search"
        value={searchState}
        onChange={(e) => {
          setSearchState(e.target.value);
        }}
      />
      <form >
        <label htmlFor="lifestyle"> lifestyle </label>
        <input id="lifestyle" name="lifestyle" type='checkbox'></input>
      </form>
    </Container>
  );
};

export default FilterBar;

const Container = styled.div`
  background: black;
  height: 100px;
  color: white;
`;

const StyledInput = styled.input`
  appearance: none;
  /* width: 100%; */
  background-color: transparent;
  font-size: 1rem;
  letter-spacing: 0.2em;
  color: white;
  padding: 8px 5px;
  outline: none;
  border: none;

  border-bottom: 2px solid white;

  ::placeholder {
    color: white;
  }
`;
