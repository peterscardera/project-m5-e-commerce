import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ListingGrid from "../Items";
import NextPage from "./NextPage";
import FilterBar from "./FilterBar";
import Cart from "../Cart";
import { useSelector } from "react-redux";

const Shop = () => {
  const [itemList, setItemList] = useState([]); //has to be set to an empty array for the slice below before component mounts
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [categoriesChecked, setCategoriesChecked] = useState({});
console.log(categoriesChecked)
  const allOfTheItems = useSelector((state) => state.gallery.items);
  //console.log(allOfTheItems);
  useEffect(() => {
    if (!allOfTheItems) {
      setLoading(true);
    } else {
      setItemList(allOfTheItems);
      setLoading(false);
    }
  });

  //index of the itemList array page that your on
  const currentPageIndex = currentPage * itemsPerPage;
  const previousPageIndex = currentPageIndex - itemsPerPage;
  const currentPosts = itemList.slice(previousPageIndex, currentPageIndex);

  //handler for next page must be on parent for page to re-render
  const loadSpecificPageNumber = (individualPageNumber) => {
    //console.log(individualPageNumber)
    setCurrentPage(individualPageNumber);
  };

  const filterHandler = () => {
    let assigned = Object.keys(categoriesChecked).filter((item) => {
      if (categoriesChecked[item] === true) {
        return categoriesChecked;
      }
    });

    console.log(assigned);

    let displayedItemList = allOfTheItems.filter((item) => {
      assigned.forEach((catChosen) => {
        if (item.category == catChosen) {
          console.log(item);
        }
      });
    });
console.log(displayedItemList)
    // let displayedItemList = allOfTheItems.filter((item) => {
    //   assigned.filter((eachCate) => {
    //     return eachCate === item.category;
    //   });
    // });

    // console.log(displayedItemList);
  };

  // useEffect(() => {
  //   console.log(categoriesChecked);
  //   let assigned = Object.keys(categoriesChecked).filter((item) => {
  //     if (categoriesChecked[item] === true) {
  //       return categoriesChecked;
  //     }
  //   });

  //   console.log(assigned);
  // });

  return (
    <React.Fragment>
      <Wrapper>
        <FilterBar
          categoriesChecked={categoriesChecked}
          setCategoriesChecked={setCategoriesChecked}
          filterHandler={filterHandler}
          allOfTheItems={allOfTheItems}
          setItemsPerPage={setItemsPerPage}
        />

        <ListingGrid itemList={currentPosts} loading={loading}></ListingGrid>
        <PageNumberContainer>
          <NextPage
            currentPage={currentPage}
            totalItems={itemList.length}
            itemsPerPage={itemsPerPage}
            loadSpecificPageNumber={loadSpecificPageNumber}
          ></NextPage>
        </PageNumberContainer>
      </Wrapper>
    </React.Fragment>
  );
};

export default Shop;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.4fr 2.2fr 0.4fr;
  gap: 1px 1px;
  grid-template-areas: "." "." ".";
`;

const PageNumberContainer = styled.div`
  /* margin-top: 25px; */
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100px;
  /* background: blue; */
`;
