import React, { useState, useEffect } from "react";
import styled from "styled-components";

//*Reminder: Filter is child component of shop.js
const FilterBar = ({
  allOfTheItems,
  setItemsPerPage,
  filterHandler,
  setCategoriesChecked,
  categoriesChecked,
}) => {
  const submitHandler = (e) => {
    // console.log(e.target.value);
    setItemsPerPage(e.target.value);
  };

  const [searchState, setSearchState] = useState("");
  //just a state of the categories from data
  const [categories, setCategories] = useState(null);
  const [clickState, setClickState] = useState(false);

  let matchedItems = allOfTheItems.filter((item) => {
    if (
      searchState.length >= 2 &&
      item.name.slice(0, 7).toLowerCase().includes(searchState.toLowerCase())
    ) {
      return item;
    }
    return null;
  });

const filterVisibilityHandler = (e) =>{
e.preventDefault();
setClickState(!clickState)

}

  useEffect(() => {
    // i mean.. I could have hard code the categories..
    let duplicatedCategories = allOfTheItems.map((item) => {
      return item.category;
    });
    let uniqueData = new Set(duplicatedCategories);
    let uniqueDataArray = [...uniqueData];
    setCategories(uniqueDataArray);
    // console.log(uniqueDataArray);
    console.log("clicked");
  }, []);

  useEffect(() => {
    console.log("second useEffecgt filter");
    filterHandler();
  }, [categoriesChecked]);

  const handleCheck = (e) => {
    console.log("handl START");
    const value = e.target.checked;
    const name = e.target.name;

    // let newCategoriesChecked = [];
    // let categoriesKeys = Object.keys(categoriesChecked)
    // categoriesKeys.forEach((key)=> {newCategoriesChecked[key]=categoriesChecked[key]})
    setCategoriesChecked({
      ...categoriesChecked,
      [name]: value,
    });
    // filterHandler();

    console.log("handl end");
  };

  if (clickState === false) {
    return (
      <>
        <FilterButton onClick={filterVisibilityHandler}> + Filters</FilterButton>
      </>
    );
  } else {
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

        {/* search below is not ready */}
        {/* <StyledInput
        autocomplete="off"
        placeholder="search"
        id="search"
        value={searchState}
        onChange={(e) => {
          setSearchState(e.target.value);
        }}
      /> */}
        {categories !== null
          ? categories.map((eachCat) => {
              return (
                <>
                  <StyledCheckBoxes>
                    <label htmlFor="eachCat"> {eachCat} </label>
                    <input
                      onChange={handleCheck}
                      id={eachCat}
                      name={eachCat}
                      type="checkbox"
                    ></input>
                  </StyledCheckBoxes>
                 
                </>
              );
            })
          : ""}
           <FilterExit onClick={filterVisibilityHandler}> X </FilterExit>
      </Container>
    );
  }
};

export default FilterBar;

const Container = styled.div`
  background: black;
height: 25px;
  color: white;
  display: flex;
  /* flex-wrap: wrap; */
  width: 100vw;
  justify-content: space-around;

  /* @media screen and (min-width: 600px) {

      height: 50px; 
      
      }  */
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

const StyledCheckBoxes = styled.div`
  margin-left: 50px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const FilterExit = styled.button`
margin-left: 100px;
font-size: 1rem;
font-weight: bold;
color: white;
outline: none;
background: transparent;
cursor: pointer;
border: none;

`
const FilterButton = styled.button`
text-align: left;
font-size: 1rem;
font-weight: bold;
height: 10px;
outline: none;
background: transparent;
cursor: pointer;
border: none;
`