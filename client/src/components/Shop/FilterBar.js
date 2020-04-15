import React, { useState } from "react";
import styled from "styled-components";

//*Reminder: Filter is child component of shop.js
const FilterBar = ({ allOfTheItems, setItemsPerPage }) => {
  
  const submitHandler = (e) => {
    // console.log(e.target.value);
    setItemsPerPage(e.target.value);
  };


const [searchState, setSearchState] = useState("")

let matchedItems = allOfTheItems.filter((item)=>{
  if (searchState.length >= 2 && item.name.slice(0,7).toLowerCase().includes(searchState.toLowerCase())){
   return item
  }

})

//remove the slice and 

console.log(matchedItems) //for now this return doesnt prop up back up to parent component



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
      <label htmlFor="search"></label>
      <input placeholder="search"id="search" value ={searchState} onChange={(e)=> {setSearchState(e.target.value)}} />
    </Container>
  );
};

export default FilterBar;

const Container = styled.div`
  background: lightblue;
  height: 50px;
`;
