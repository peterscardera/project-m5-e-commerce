import React from "react";
import styled from "styled-components";

const NextPage = ({ totalItems, itemsPerPage, loadSpecificPageNumber }) => {
  //console.log(totalItems, itemsPerPage, "IM IN NEXT PAGE");

  const pageNumbers = [];

  for (let i = 1; i <= Math.floor(totalItems / itemsPerPage); i++) {
    //should be 43.5 per page flooring it give 43 pages
    pageNumbers.push(i);
  }

  console.log(pageNumbers);
  return (
    <React.Fragment>
      <nav>
        <ul>
          {pageNumbers.map((individualPageNumber) => {
            return (
              <Wrapper>
                <StyledLi>
                  <Button onClick={()=>{loadSpecificPageNumber(individualPageNumber)}}>{individualPageNumber} </Button>
                </StyledLi>
              </Wrapper>
            );
          })}
        </ul>
      </nav>
    </React.Fragment>
  );
};
export default NextPage;
const Wrapper = styled.div`
background: red;
display: inline-flex;
`

const StyledLi = styled.li`
list-style-type: none;

`
const Button = styled.button`


font-size: .8rem;
width: 20px;
height: 20px;

`