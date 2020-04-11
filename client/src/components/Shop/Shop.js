import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../Layout";
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

  return (
    <React.Fragment>
      <Layout>
        <FilterBar setItemsPerPage={setItemsPerPage} />
        

        <ListingGrid itemList={currentPosts} loading={loading}></ListingGrid>
        <NextPage
          currentPage={currentPage}
          totalItems={itemList.length}
          itemsPerPage={itemsPerPage}
          loadSpecificPageNumber={loadSpecificPageNumber}
        ></NextPage>
        {/* for now well place cart bellow  */}
        {/* <Cart /> */}
      </Layout>
    </React.Fragment>
  );
};

export default Shop;
