import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

const Layout = (props) => {
  return (
    <React.Fragment>
      <NavBar />
      <div>{props.children}</div>
      {/* perhaps a footer ? */}
    </React.Fragment>
  );
};

export default Layout;
