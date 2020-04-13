import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import VendorPage from "./VendorPage"
import AddToCartButton from "../AddToCart"


//**Reminder itemDetails is not a child of any other component other then APP.js **/
const ItemDetails = () => {
  const allOfTheItems = useSelector((state) => state.gallery.items);
  const allOfTheVendors = useSelector((state) => state.vendors.items);

  //setting the selected product into its own state. So when the user changes the ulr on top the page gets rerender or
  // if we wouldneed to change a state and re-render
  const [productChosen, setProductChosen] = useState(null);
  const [associatedComp, setAssociatedComp] = useState(null);
  // console.log(associatedComp);
  // console.log(productChosen);
  const { itemId } = useParams();
  // console.log(itemId);

  //-----------useEffect to find the object of the selected item based on the params id-----------
  useEffect(() => {
    // *NO NEED FOR AN 'IF' AS I CONDITIONALLY RENDERED THIS PAGE IN APPs
    let selectedItem = allOfTheItems.find((element) => {
      return element.id === parseInt(itemId);
    });
    setProductChosen([selectedItem]);
  }, [itemId]); //**if i add the use params the conditional render doesnt work as state needs to change**

  //-----------useEffect to find company associated with the item selected-----------
  useEffect(() => {
    if (productChosen !== null) {
      productChosen.forEach((eachProduct) => {
        let company = allOfTheVendors.filter((element) => {
          return element.id === eachProduct.companyId;
        });
        setAssociatedComp(company);
      });
    } else {
      return;
    }
  }, [productChosen]); //retriggered when product changes

  return (
    <React.Fragment>
      {associatedComp != null &&
        associatedComp.map((eachComp) => {
          // console.log(eachComp);
          return (
            <>
              <VendorPage
                name={eachComp.name}
                itsWebSite={eachComp.url}
                itsCountry={eachComp.country}
                itsId={eachComp.id}
              >
                <div>{eachComp.name}</div>
              </VendorPage>
            </>
          );
        })}
      {productChosen != null &&
        productChosen.map((item) => {
          return (
            <React.Fragment>
              <GridContainer>
                <TopRow>
                  <div> {item.name}</div>
                  <div>Modal Number: {item.id} </div>
                </TopRow>

                <ImgContainer>
                  <img src={item.imageSrc} />
                </ImgContainer>

                <DetailsContainer>
                  <div>{item.price}</div>
                  <div>Body location : {item.body_location}</div>
                  <div>Category : {item.category}</div>
                  <div>Num in stock: {item.numInStock}</div>
                  <AddToCartButton productChosen={productChosen}>  </AddToCartButton>
                </DetailsContainer>
                <RelatedProduct>
                  <div>Related Item</div>
                  <div>Related Item</div>
                  <div>Related Item</div>
                </RelatedProduct>
              </GridContainer>
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};

export default ItemDetails;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, minmax(200px, 1fr));
  /* gap: 1px 1px; */
  grid-template-areas:
    "Toprow Toprow Toprow Toprow"
    "Imgcontainer Imgcontainer DetailsContainer DetailsContainer"
    "Imgcontainer Imgcontainer DetailsContainer DetailsContainer"
    "Relatedproducts Relatedproducts Relatedproducts Relatedproducts";

  @media only screen and (max-width: 375px) {
    grid-template-areas:
      "Toprow Toprow Toprow Toprow"
      "Imgcontainer Imgcontainer Imgcontainer Imgcontainer"
      "DetailsContainer DetailsContainer DetailsContainer DetailsContainer"
      "Relatedproducts Relatedproducts Relatedproducts Relatedproducts";
  }
`;

const TopRow = styled.div`
  background: red;
  grid-area: Toprow;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ImgContainer = styled.div`
  grid-area: Imgcontainer;
  background: grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailsContainer = styled.div`
  grid-area: DetailsContainer;
  background: pink;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RelatedProduct = styled.div`
  background: purple;
  grid-area: Relatedproducts;
`;
