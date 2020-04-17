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

  //--------create specific about of page number to show
  for (let i = currentPage; i <= Math.floor(totalItems / itemsPerPage); i++) {
    if (pageNumbers.length < pagesNumberTooShow) {
      pageNumbers.push(i);
    } else {
      pageNumbers.push("...");
      pageNumbers.push(`${Math.floor(totalItems / itemsPerPage)}`);
      break;
    }
  }
  if (pageNumbers[0] !== 1) {
    pageNumbers.unshift("...");
    pageNumbers.unshift(1);
  }
  //---------------------------------------------------
  // console.log(pageNumbers);

  return (
    <React.Fragment>
      <nav>
        <ul>
          {pageNumbers.map((individualPageNumber, index) => {
            return (
              <Wrapper
              key = {index}
              >
                <StyledLi>
                  {individualPageNumber === "..." ? (
                    <span> ... </span>
                  ) : (
                    <Button
                      currentPage={currentPage}
                      onClick={() => {
                        loadSpecificPageNumber(individualPageNumber);
                      }}
                    >
                      {individualPageNumber}
                    </Button>
                  )}
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
  margin: 1px;
  display: inline-flex;
`;

const StyledLi = styled.li`
  list-style-type: none;
`;
const Button = styled.button`
  font-size: 1.1rem;
  width: 28px;
  height: 22px;
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  font-weight: ${(props) =>
    props.children === props.currentPage ? "bold" : "none"};
  border-bottom: ${(props) =>
    props.children === props.currentPage ? "1px solid black" : "none"};
`;
