import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import Footer from "./Footer"


const Layout = (props) => {
  return (
    <React.Fragment>
      <div>{props.children}</div>
     <Footer></Footer>
    </React.Fragment>
  );
};

export default Layout;
