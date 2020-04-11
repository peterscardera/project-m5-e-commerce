import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

const Layout = (props) => {
  return (
    <React.Fragment>
      <div>{props.children}</div>
      {/* perhaps a footer ? */}
    </React.Fragment>
  );
};

export default Layout;
