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

  let matchedItems = allOfTheItems.filter((item) => {
    if (
      searchState.length >= 2 &&
      item.name.slice(0, 7).toLowerCase().includes(searchState.toLowerCase())
    ) {
      return item;
    }
    return null;
  });

  useEffect(() => {
    // i mean.. I could have hard code the categories..
    let duplicatedCategories = allOfTheItems.map((item) => {
      return item.category;
    });
    let uniqueData = new Set(duplicatedCategories);
    let uniqueDataArray = [...uniqueData];
    setCategories(uniqueDataArray);
    // console.log(uniqueDataArray);
  }, []);

  const handleCheck = (e) => {
    const value = e.target.checked;
    const name = e.target.name;

    setCategoriesChecked({
      ...categoriesChecked,
      [e.target.name]: value,
    });
    filterHandler();
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
      {categories !== null
        ? categories.map((eachCat) => {
            return (
              <>
                <label htmlFor="eachCat"> {eachCat} </label>
                <input
                  onChange={handleCheck}
                  id={eachCat}
                  name={eachCat}
                  type="checkbox"
                ></input>
              </>
            );
          })
        : ""}
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
