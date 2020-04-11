import React from "react";
import styled from "styled-components";

const NextPage = ({
  currentPage,
  totalItems,
  itemsPerPage,
  loadSpecificPageNumber,
}) => {
  //console.log(totalItems, itemsPerPage, "IM IN NEXT PAGE");

  const pageNumbers = [];
  const pagesNumberTooShow = 3;

  for (let i = currentPage; i <= Math.floor(totalItems / itemsPerPage); i++) {
    //should be 43.5 per page flooring it give 43 pages
    if (pageNumbers.length < pagesNumberTooShow) {
      pageNumbers.push(i);
    } else {
      pageNumbers.push("...");
      pageNumbers.push(43);
      break;
    }
  }

  console.log(pageNumbers);
  //we only want to show
  return (
    <React.Fragment>
      <nav>
        <ul>
          {pageNumbers.map((individualPageNumber, index) => {
            return (
              <Wrapper>
                <StyledLi>
                  <Button
                    onClick={() => {
                      loadSpecificPageNumber(individualPageNumber);
                    }}
                  >
                    {individualPageNumber}
                  </Button>
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
`;

const StyledLi = styled.li`
  list-style-type: none;
`;
const Button = styled.button`
  font-size: 0.8rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
