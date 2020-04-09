import React, { useState, useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import Cart from "./Cart";

import NavBar from "./NavBar";
function App() {
  return (
    <React.Fragment>
      <GlobalStyles />
      <NavBar />
      <Cart></Cart>
    </React.Fragment>
  );
}

export default App;
